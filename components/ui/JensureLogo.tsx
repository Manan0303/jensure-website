interface JensureLogoProps {
  size?: 'sm' | 'md' | 'lg'
  wordmark?: boolean
  className?: string
}

export default function JensureLogo({ size = 'md', wordmark = true, className = '' }: JensureLogoProps) {
  const dim = size === 'sm' ? 28 : size === 'lg' ? 44 : 36

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Mark */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Jensure"
      >
        <defs>
          <linearGradient id="jensure-mark-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3D5AFE" />
            <stop offset="1" stopColor="#00E5CC" />
          </linearGradient>
          <linearGradient id="jensure-mark-grad-2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F6DFF" />
            <stop offset="1" stopColor="#1AEBDB" />
          </linearGradient>
        </defs>

        {/* Background — rounded square with gradient */}
        <rect width="40" height="40" rx="10" fill="url(#jensure-mark-grad)" />

        {/* Subtle inner glow ring */}
        <rect width="40" height="40" rx="10" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* J letterform — drawn as strokes for clean rendering at all sizes */}
        <g stroke="white" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Top horizontal bar */}
          <line x1="10" y1="11" x2="30" y2="11" strokeWidth="4.5" />
          {/* Vertical stem + hook */}
          <path d="M22 11 V28 Q22 34 16 34 Q10 34 10 28 V26" strokeWidth="4.5" />
        </g>

        {/* Small accent dot — bottom-right corner for brand personality */}
        <circle cx="32" cy="32" r="2.5" fill="rgba(255,255,255,0.4)" />
      </svg>

      {/* Wordmark */}
      {wordmark && (
        <span className="font-bold tracking-tight leading-none" style={{ fontSize: size === 'sm' ? '16px' : size === 'lg' ? '22px' : '18px' }}>
          <span
            style={{
              background: 'linear-gradient(90deg, #6B85FF, #00E5CC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            J
          </span>
          <span className="text-brand-text">ensure</span>
        </span>
      )}
    </div>
  )
}
