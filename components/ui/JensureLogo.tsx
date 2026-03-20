interface JensureLogoProps {
  size?: 'sm' | 'md' | 'lg'
  wordmark?: boolean
  className?: string
}

export default function JensureLogo({ size = 'md', wordmark = true, className = '' }: JensureLogoProps) {
  const dim = size === 'sm' ? 34 : size === 'lg' ? 52 : 42
  const fontSize = size === 'sm' ? 20 : size === 'lg' ? 28 : 23

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Mark */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background: solid dark, minimal */}
        <rect width="40" height="40" rx="10" fill="#0F172A" />
        <rect width="40" height="40" rx="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* J letterform: clean geometric stroke */}
        {/* Top crossbar */}
        <line x1="11" y1="12" x2="29" y2="12" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Vertical stem */}
        <line x1="24" y1="12" x2="24" y2="26" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Hook curve */}
        <path d="M24 26 Q24 33 17 33 Q10 33 10 26" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Teal accent dot */}
        <circle cx="24" cy="12" r="2.5" fill="#00E5CC" />
      </svg>

      {/* Wordmark */}
      {wordmark && (
        <span
          className="font-semibold tracking-tight text-white leading-none"
          style={{ fontSize }}
        >
          Jensure
        </span>
      )}
    </div>
  )
}
