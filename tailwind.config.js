/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{ 
      transparent: 'transparent',
      current: 'currentColor',
      boxBackgroundColor: '#121212',
      pageBackgroundColor: '#000',
      linkColor: '#b3b3b3',
      white: '#ffffff'
    }
  },
  plugins: [],
};
