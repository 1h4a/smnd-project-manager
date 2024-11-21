import type { Config } from "tailwindcss";

export default {
  // darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // general UI colors
        'smnd': '#427BE9',
        'almostblack': '#1D1D1D',
        'ultradark': '#515151',
        'darkgray': '#6b6b6b',
        'regulargray': '#d6d6d6',
        'ngray': '#E9E9E9',
        'textgray': '#adadad',
        // filetype colors
        'docx': '#6B8BC8',
        'pptx': '#D06759',
        'xlsx': '#729C6E',
        'uid-ft': '#727272'
      },
    },
  },
  plugins: [

  ],
} satisfies Config;
