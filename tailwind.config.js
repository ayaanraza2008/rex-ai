/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-border': 'var(--color-border)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        glow: 'var(--color-glow)',
        hud: {
          cyan: '#22D3EE',
          blue: '#3B82F6',
          pink: '#F472B6',
          magenta: '#D946EF',
          violet: '#A855F7',
          darkBgRex: '#050B14',
          darkBgNaya: '#12060F',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px var(--color-glow))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 35px var(--color-glow))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
};
