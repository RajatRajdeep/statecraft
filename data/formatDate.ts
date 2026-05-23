const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// Uses UTC methods so output is identical on server (Node.js) and client (browser).
// toLocaleDateString() is intentionally avoided — ICU data differences cause hydration mismatches.
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}
