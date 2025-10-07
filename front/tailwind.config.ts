import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#0f172a',
          foreground: '#f8fafc'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
