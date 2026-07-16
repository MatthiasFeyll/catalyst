import type { Config } from "tailwindcss";

function withOpacity(variableName: string) {
  return ({ opacityValue }: any) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': withOpacity('--dark'),
        'primary': withOpacity('--primary'),
        'text': withOpacity('--text'),
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
} satisfies Config;
