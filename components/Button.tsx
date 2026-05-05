import Link from './Link'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  href?: string
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  [key: string]: unknown
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-gold text-navy! hover:bg-gold-dark',
  secondary: 'bg-navy text-white hover:bg-navy-light dark:hover:bg-navy-light',
  outline: 'border border-gold text-gold hover:bg-gold/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-block rounded font-semibold transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  )
}
