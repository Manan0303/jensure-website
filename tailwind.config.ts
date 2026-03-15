import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core backgrounds
          bg: '#0A0F2C',
          surface: '#111633',
          'surface-2': '#161D45',

          // Accents
          accent: '#3D5AFE',
          'accent-light': '#6B85FF',
          cta: '#00E5CC',
          'cta-dark': '#00B8A3',

          // Text
          text: '#F0F2FF',
          'text-muted': '#64748B',

          // Semantic
          error: '#FF6B6B',

          // Legacy (kept for backwards compat)
          white: '#FFFFFF',
          'off-white': '#F5F7FF',
          black: '#0F0F0F',
          'gray-dark': '#374151',
          gray: '#6B7280',
          'gray-light': '#E5E7EB',
          blue: '#3D5AFE',
          'blue-light': '#6B85FF'
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace']
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }]
      },
      maxWidth: {
        '8xl': '88rem'
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 20% 30%, rgba(61,90,254,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(0,229,204,0.20) 0%, transparent 40%), linear-gradient(135deg, #0A0F2C, #141A4F, #0D3B66)',
        'glow-cta': 'radial-gradient(ellipse at center, rgba(0,229,204,0.15) 0%, transparent 70%)',
        'glow-accent': 'radial-gradient(ellipse at center, rgba(61,90,254,0.15) 0%, transparent 70%)'
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-medium': 'floatMedium 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease forwards'
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' }
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-2deg)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      boxShadow: {
        'glow-cta': '0 0 24px rgba(0,229,204,0.4)',
        'glow-accent': '0 0 24px rgba(61,90,254,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.12)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.2)'
      }
    }
  },
  plugins: [typography]
}

export default config
