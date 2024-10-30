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
      white: '#ffffff',
      blue: '#5179a1',
      subdued: '#b3b3b3',
      highlight: '#1f1f1f'
    },
    rotate: {
      '25': '25deg'
    },
    gridTemplateColumns: {
      'custom-layout': '16px 40px minmax(240px, 6fr) minmax(160px, 4fr) minmax(120px, 3fr) minmax(40px, 1fr)',
      'custom-layout-md': '16px 40px minmax(240px, 6fr) minmax(160px, 4fr) minmax(40px, 1fr)',
      'custom-layout-sm': '16px 40px minmax(160px, 6fr) minmax(40px, 1fr)'
    }
  },
  plugins: [],
};
