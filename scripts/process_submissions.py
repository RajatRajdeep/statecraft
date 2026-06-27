#!/usr/bin/env python3
"""
Process confirmed commentary submissions from Google Sheets and create GitHub PRs.

Required env vars:
  GOOGLE_SERVICE_ACCOUNT_KEY  - JSON service account key (string)
  GOOGLE_SHEET_ID             - Sheet ID from the URL
  GITHUB_TOKEN                - GitHub personal access token or Actions token
  REPO                        - owner/repo  e.g. "statecraft-institute/site"
"""

import io
import json
import os
import re
import subprocess
import tempfile
from datetime import date
from pathlib import Path


import gspread
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from github import Auth, Github
from slugify import slugify

# Load .env when running locally (ignored in CI where vars are injected)
_env_file = Path(__file__).parent.parent / ".env"
if _env_file.exists():
    for _line in _env_file.read_text().splitlines():
        _line = _line.strip()
        if _line and not _line.startswith("#") and "=" in _line:
            _k, _v = _line.split("=", 1)
            os.environ.setdefault(_k.strip(), _v.strip())



# ── Paths ──────────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).parent.parent
COMMENTARIES_DIR = REPO_ROOT / "data" / "commentaries"
PEOPLE_DIR = REPO_ROOT / "data" / "people"
ARTICLES_IMG_DIR = REPO_ROOT / "public" / "static" / "images" / "articles"
PEOPLE_IMG_DIR = REPO_ROOT / "public" / "static" / "images" / "people"

# ── Constants ──────────────────────────────────────────────────────────────────


VALID_DOC_MIMES = {
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.google-apps.document",
}
VALID_DOC_EXTS = {".doc", ".docx"}
VALID_IMG_EXTS = {".jpg", ".jpeg", ".jfif"}

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.readonly",
]

# Exact column names from the Google Sheet
COL_TITLE = "Title"
COL_LANG = "Language"
COL_TAGS = "Topic / tags"
COL_SUMMARY = "Summary"
COL_DOC = "Commentary Doc (.doc or .docx)"
COL_AUTHOR_NAME = "Full name (as it should appear on your byline)"
COL_OCCUPATION = "Current position / title"
COL_COMPANY = "Organisation or Institution"
COL_BIO = "Brief bio"
COL_PHOTO = "Profile photo"
COL_LINKEDIN = "LinkedIn URL"
COL_TWITTER = "X / Twitter URL"
COL_ARTICLE_IMG = "Commentry Photo Link"
COL_CONFIRMED = "Confirmed"
COL_PUBLISH_DATE = "Publish Date"
COL_PROCESSED = "Processed"

# ── Auth ───────────────────────────────────────────────────────────────────────


def get_credentials() -> Credentials:
    # Local dev: point to the JSON file
    key_file = os.environ.get("GOOGLE_SERVICE_ACCOUNT_KEY_FILE")
    if key_file:
        return Credentials.from_service_account_file(key_file, scopes=SCOPES)
    # GitHub Actions: inline JSON string
    info = json.loads(os.environ["GOOGLE_SERVICE_ACCOUNT_KEY"])
    return Credentials.from_service_account_info(info, scopes=SCOPES)


def get_services(creds: Credentials):
    gc = gspread.authorize(creds)
    drive = build("drive", "v3", credentials=creds)
    return gc, drive


# ── Slug / tag helpers ─────────────────────────────────────────────────────────


def title_to_slug(title: str) -> str:
    return slugify(title)


def name_to_slug(name: str) -> str:
    return slugify(name)


def normalise_tags(raw: str) -> list:
    tags = []
    for tag in raw.split(","):
        tag = tag.strip().lower().replace(" ", "-")
        tag = re.sub(r"[^a-z0-9-]", "", tag)
        tag = re.sub(r"-+", "-", tag).strip("-")
        if tag:
            tags.append(tag)
    return tags


def normalise_date(raw: str) -> str:
    """Return YYYY-MM-DD; fall back to today if empty or unparseable."""
    raw = raw.strip()
    if not raw:
        return date.today().isoformat()
    # Accept YYYY-MM-DD as-is
    if re.match(r"^\d{4}-\d{2}-\d{2}$", raw):
        return raw
    # Try DD/MM/YYYY or DD-MM-YYYY
    m = re.match(r"^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})$", raw)
    if m:
        d, mo, y = m.groups()
        return f"{y}-{int(mo):02d}-{int(d):02d}"
    return date.today().isoformat()


# ── Drive helpers ──────────────────────────────────────────────────────────────


def extract_drive_id(url: str) -> str | None:
    for pattern in [
        r"/file/d/([a-zA-Z0-9_-]+)",
        r"/document/d/([a-zA-Z0-9_-]+)",
        r"[?&]id=([a-zA-Z0-9_-]+)",
    ]:
        m = re.search(pattern, url)
        if m:
            return m.group(1)
    return None


def get_file_meta(drive, file_id: str) -> dict:
    return drive.files().get(fileId=file_id, fields="name,mimeType").execute()


def download_drive_file(drive, file_id: str, mime_type: str) -> bytes:
    if mime_type == "application/vnd.google-apps.document":
        export_mime = (
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
        req = drive.files().export_media(fileId=file_id, mimeType=export_mime)
    else:
        req = drive.files().get_media(fileId=file_id)
    buf = io.BytesIO()
    dl = MediaIoBaseDownload(buf, req)
    done = False
    while not done:
        _, done = dl.next_chunk()
    return buf.getvalue()


# ── Pandoc ─────────────────────────────────────────────────────────────────────


def docx_to_markdown(docx_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as f:
        f.write(docx_bytes)
        tmp = f.name
    try:
        result = subprocess.run(
            ["pandoc", tmp, "-t", "markdown", "--wrap=none"],
            capture_output=True,
            text=True,
            check=True,
        )
        return result.stdout
    finally:
        os.unlink(tmp)


# ── Next article image number ──────────────────────────────────────────────────


def next_article_number() -> int:
    nums = []
    for f in ARTICLES_IMG_DIR.glob("article*"):
        m = re.match(r"article(\d+)", f.stem)
        if m:
            nums.append(int(m.group(1)))
    return max(nums, default=0) + 1


# ── MDX builders ──────────────────────────────────────────────────────────────


def build_commentary_mdx(
    title: str,
    publish_date: str,
    lang: str,
    tags: list,
    summary: str,
    image_path: str,
    author_slug: str,
    body: str,
) -> str:
    images_yaml = json.dumps([image_path]) if image_path else "[]"
    return (
        f"---\n"
        f'title: "{title}"\n'
        f'date: "{publish_date}"\n'
        f'lang: "{lang}"\n'
        f"tags: {json.dumps(tags)}\n"
        f"draft: false\n"
        f'summary: "{summary}"\n'
        f"images: {images_yaml}\n"
        f'authors: ["{author_slug}"]\n'
        f"---\n\n"
        f'<Summary lang="{lang}">\n'
        f"  {summary}\n"
        f"</Summary>\n\n"
        f"---\n\n"
        f"{body.strip()}\n\n"
        f"*Disclaimer: Views expressed are of the author(s) and do not necessarily reflect the views of The Statecraft Institute.*\n"
    )


def build_people_mdx(
    name: str,
    avatar_path: str,
    occupation: str,
    company: str,
    linkedin: str,
    twitter: str,
    bio: str,
) -> str:
    lines = ["---", f"name: {name}"]
    if avatar_path:
        lines.append(f"avatar: {avatar_path}")
    if occupation:
        lines.append(f"occupation: {occupation}")
    if company:
        lines.append(f"company: {company}")
    if twitter:
        lines.append(f"twitter: {twitter}")
    if linkedin:
        lines.append(f"linkedin: {linkedin}")
    lines += ["isAuthor: true", "isBoardMember: false", "---", "", bio.strip(), ""]
    return "\n".join(lines)


# ── Git helpers ────────────────────────────────────────────────────────────────


def git(*args: str) -> None:
    subprocess.run(["git", *args], check=True, cwd=REPO_ROOT)


# ── Row processor ──────────────────────────────────────────────────────────────


def process_row(row: dict, drive, gh_repo) -> tuple[bool, str, list[str]]:
    """
    Process one sheet row.
    Returns (success, summary_line, notes_list).
    On False, no files have been committed and no branch exists.
    """
    notes: list[str] = []

    def col(name: str) -> str:
        return str(row.get(name, "") or "").strip()

    title = col(COL_TITLE)
    if not title:
        return False, "Missing title", []

    slug = title_to_slug(title)
    if not slug:
        return False, f"Could not derive slug from title: {title!r}", []

    commentary_path = COMMENTARIES_DIR / f"{slug}.mdx"
    if commentary_path.exists():
        return False, f"Commentary already exists at `commentaries/{slug}.mdx`", []

    # ── Validate and download commentary doc ────────────────────────────────
    doc_url = col(COL_DOC)
    if not doc_url:
        return False, "No commentary document link provided", []

    doc_id = extract_drive_id(doc_url)
    if not doc_id:
        return False, f"Could not extract Drive ID from doc URL: {doc_url!r}", []

    try:
        doc_meta = get_file_meta(drive, doc_id)
    except Exception as e:
        return False, f"Drive access error for doc: {e}", []

    doc_mime = doc_meta["mimeType"]
    doc_name = doc_meta.get("name", "")
    doc_ext = Path(doc_name).suffix.lower()

    if doc_mime not in VALID_DOC_MIMES:
        return False, f"Unsupported document format `{doc_name}` (mime: {doc_mime})", []
    if (
        doc_ext
        and doc_ext not in VALID_DOC_EXTS
        and doc_mime != "application/vnd.google-apps.document"
    ):
        return (
            False,
            f"Unsupported document extension `{doc_ext}` — expected .doc or .docx",
            [],
        )

    try:
        doc_bytes = download_drive_file(drive, doc_id, doc_mime)
    except Exception as e:
        return False, f"Failed to download doc: {e}", []

    try:
        body_md = docx_to_markdown(doc_bytes)
    except subprocess.CalledProcessError as e:
        return False, f"Pandoc conversion failed: {e.stderr}", []

    # ── Create branch ───────────────────────────────────────────────────────
    branch = f"submission/{slug}"
    git("checkout", "-b", branch)

    # ── Article image ───────────────────────────────────────────────────────
    image_path = ""
    art_num = next_article_number()
    article_img_url = col(COL_ARTICLE_IMG)

    if article_img_url:
        img_id = extract_drive_id(article_img_url)
        if not img_id:
            notes.append(
                f"Could not extract Drive ID from article image URL: {article_img_url!r}"
            )
        else:
            try:
                img_meta = get_file_meta(drive, img_id)
                img_ext = Path(img_meta.get("name", "")).suffix.lower()
                if img_ext not in VALID_IMG_EXTS:
                    notes.append(
                        f"Article image skipped — format `{img_ext}` not allowed "
                        f"(expected .jpg / .jpeg / .jfif)"
                    )
                else:
                    img_bytes = download_drive_file(drive, img_id, img_meta["mimeType"])
                    dest = ARTICLES_IMG_DIR / f"article{art_num}{img_ext}"
                    dest.write_bytes(img_bytes)
                    image_path = f"/static/images/articles/article{art_num}{img_ext}"
                    git("add", str(dest))
            except Exception as e:
                notes.append(f"Article image download failed: {e}")
    else:
        notes.append("No article image provided — `images` field left empty")

    # ── Author ──────────────────────────────────────────────────────────────
    author_name = col(COL_AUTHOR_NAME)
    author_slug = name_to_slug(author_name) if author_name else "unknown-author"
    author_path = PEOPLE_DIR / f"{author_slug}.mdx"
    author_status = ""

    if author_path.exists():
        author_status = f"Existing profile used for `{author_slug}`"
    else:
        avatar_path = ""
        photo_url = col(COL_PHOTO)

        if photo_url:
            photo_id = extract_drive_id(photo_url)
            if not photo_id:
                notes.append(
                    f"Could not extract Drive ID from photo URL: {photo_url!r}"
                )
            else:
                try:
                    photo_meta = get_file_meta(drive, photo_id)
                    photo_ext = Path(photo_meta.get("name", "")).suffix.lower()
                    if photo_ext not in VALID_IMG_EXTS:
                        notes.append(
                            f"Author photo skipped — format `{photo_ext}` not allowed "
                            f"(expected .jpg / .jpeg / .jfif)"
                        )
                    else:
                        photo_bytes = download_drive_file(
                            drive, photo_id, photo_meta["mimeType"]
                        )
                        dest = PEOPLE_IMG_DIR / f"{author_slug}{photo_ext}"
                        dest.write_bytes(photo_bytes)
                        avatar_path = f"/static/images/people/{author_slug}{photo_ext}"
                        git("add", str(dest))
                except Exception as e:
                    notes.append(f"Author photo download failed: {e}")

        people_mdx = build_people_mdx(
            name=author_name,
            avatar_path=avatar_path,
            occupation=col(COL_OCCUPATION),
            company=col(COL_COMPANY),
            linkedin=col(COL_LINKEDIN),
            twitter=col(COL_TWITTER),
            bio=col(COL_BIO),
        )
        author_path.write_text(people_mdx)
        git("add", str(author_path))
        author_status = f"New author profile created: `data/people/{author_slug}.mdx`"
        if not avatar_path:
            author_status += " (no photo — add manually)"

    # ── Write commentary MDX ────────────────────────────────────────────────
    tags = normalise_tags(col(COL_TAGS))
    lang = col(COL_LANG).lower() or "english"
    summary = col(COL_SUMMARY)
    publish_date = normalise_date(col(COL_PUBLISH_DATE))

    commentary_mdx = build_commentary_mdx(
        title=title,
        publish_date=publish_date,
        lang=lang,
        tags=tags,
        summary=summary,
        image_path=image_path,
        author_slug=author_slug,
        body=body_md,
    )
    commentary_path.write_text(commentary_mdx)
    git("add", str(commentary_path))

    # ── Commit and push ─────────────────────────────────────────────────────
    git("commit", "-m", f"add commentary: {title[:72]}")
    git("push", "--force", "origin", branch)

    # ── Open PR ─────────────────────────────────────────────────────────────
    new_author = "New author" in author_status

    missing: list[str] = []
    if not image_path:
        missing.append("Commentary Image URL")
    if not col(COL_SUMMARY):
        missing.append("Summary")
    if not col(COL_TAGS):
        missing.append("Tags")
    if "no photo" in author_status.lower():
        missing.append("Author Photo URL")

    # Create the PR first so its number is available for the preview links,
    # then fill in the full description.
    pr = gh_repo.create_pull(
        title=f"Add commentary: {title}",
        body="Generating description…",
        head=branch,
        base="main",
    )

    preview_base = (
        f"https://deploy-preview-{pr.number}--creative-haupia-e8c79a.netlify.app"
    )

    # ── Summary ──────────────────────────────────────────────────────────────
    summary_lines = [f"- Added article **{title}** by {author_name}"]
    if new_author:
        summary_lines.append(f"- Added author **{author_name}**")
    pr_sections = ["## Summary", "\n".join(summary_lines)]

    # ── Preview ──────────────────────────────────────────────────────────────
    preview_lines = [f"- Commentary: {preview_base}/commentaries/{slug}"]
    if new_author:
        preview_lines.append(f"- Author: {preview_base}/authors/{author_slug}")
    pr_sections += ["", "## Preview", "\n".join(preview_lines)]

    # ── Missing Data ─────────────────────────────────────────────────────────
    if missing:
        pr_sections += [
            "",
            "## Missing Data",
            "\n".join(f"- {m}" for m in missing),
        ]

    # ── Validation ───────────────────────────────────────────────────────────
    validation_lines = [
        "- [ ] Commentary",
        "- [ ] Commentary URL",
    ]
    if new_author:
        validation_lines += [
            "- [ ] Author",
            "- [ ] Author URL",
        ]
    pr_sections += ["", "## Validation", "\n".join(validation_lines)]

    if notes:
        pr_sections += ["", "## Notes", "\n".join(f"- {n}" for n in notes)]

    pr.edit(body="\n".join(pr_sections))

    return True, f"PR #{pr.number} created for `{slug}`", notes


# ── Main ───────────────────────────────────────────────────────────────────────


def main() -> None:
    creds = get_credentials()
    gc, drive = get_services(creds)

    sheet_id = os.environ["GOOGLE_SHEET_ID"]
    gh = Github(auth=Auth.Token(os.environ["GITHUB_TOKEN"]))
    gh_repo = gh.get_repo(os.environ["REPO"])

    ws = gc.open_by_key(sheet_id).sheet1
    headers = ws.row_values(1)
    all_rows = ws.get_all_records(expected_headers=headers)

    # Ensure Processed column exists
    if COL_PROCESSED not in headers:
        processed_col_idx = len(headers) + 1
        ws.update_cell(1, processed_col_idx, COL_PROCESSED)
        headers.append(COL_PROCESSED)
    else:
        processed_col_idx = headers.index(COL_PROCESSED) + 1

    # Configure git identity for commits
    git("config", "user.email", "github-actions[bot]@users.noreply.github.com")
    git("config", "user.name", "github-actions[bot]")

    results: list[tuple[str, bool, str]] = []

    for sheet_row_num, row in enumerate(all_rows, start=2):  # row 1 is headers
        confirmed = str(row.get(COL_CONFIRMED, "") or "").strip().upper()
        processed = str(row.get(COL_PROCESSED, "") or "").strip().upper()

        if confirmed not in {"TRUE", "YES", "1"} or processed in {"TRUE", "YES", "1"}:
            continue

        title = str(row.get(COL_TITLE, "") or "").strip() or f"Row {sheet_row_num}"
        print(f"\nProcessing row {sheet_row_num}: {title}")

        try:
            git("checkout", "main")
            success, summary, notes = process_row(row, drive, gh_repo)
        except Exception as e:
            success, summary = False, f"Unexpected error: {e}"
            try:
                git("checkout", "main")
            except Exception:
                pass

        results.append((title, success, summary))
        if success:
            ws.update_cell(sheet_row_num, processed_col_idx, "TRUE")

    print("\n── Summary ──────────────────────────────")
    for title, ok, summary in results:
        mark = "✓" if ok else "✗"
        print(f"  {mark}  {title}: {summary}")

    if not results:
        print("  No confirmed, unprocessed rows found.")

    write_step_summary(results)


def write_step_summary(results: list[tuple[str, bool, str]]) -> None:
    """Render the run summary on the GitHub Actions Summary page (if running in CI)."""
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if not summary_path:
        return

    lines = ["## Process Commentary Submissions", ""]
    if not results:
        lines.append("**No confirmed, unprocessed rows found.**")
    else:
        lines.append("| | Title | Result |")
        lines.append("| --- | --- | --- |")
        for title, ok, summary in results:
            mark = "✅" if ok else "❌"
            lines.append(f"| {mark} | {title} | {summary} |")

    with open(summary_path, "a", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


if __name__ == "__main__":
    main()
