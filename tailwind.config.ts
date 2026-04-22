import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F4EFE4',
        'cream-dark': '#E8E0CF',
        ink: '#1A1410',
        'ink-muted': '#6B5E52',
        'plasa-red': '#C0392B',
        'plasa-red-light': '#FF8A7A',
        'plasa-green': '#2A7A4B',
        'plasa-amber': '#B8780A',
      },
      fontFamily: {
        'archivo-black': ['"Archivo Black"', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
