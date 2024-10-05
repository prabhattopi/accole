import type { Config } from 'tailwindcss';
import preline from 'preline/plugin'; // Use ES module import for Preline

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/preline/dist/*.js', // Preline content
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [
    preline, // Use the imported Preline plugin
  ],
};

export default config;
