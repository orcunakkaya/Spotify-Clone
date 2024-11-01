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
      highlight: '#1f1f1f',
      hoverBackgroundColor: '#ffffff1a',
      tinted: '#ffffff4d',
      decorativeSubdued: '#282828',
    },
    rotate: {
      '25': '25deg'
    },
    gridTemplateColumns: {
      'custom-layout': '16px 40px minmax(0px, 6fr) minmax(0px, 4fr) minmax(0px, 3fr) minmax(40px, 80px)',
      'custom-layout-md': '16px 40px minmax(0px, 1fr) minmax(0px, 1fr) minmax(40px, 60px)',
      'custom-layout-sm': '16px 40px minmax(160px, 6fr) minmax(40px, 1fr)',
      // 'custom-base-layout': 'minmax(min-content, 400px) minmax(min-content, 1fr)'
      // 'custom-base-layout': 'auto 1fr',
      'custom-base-layout': 'minmax(min-content, 350px) 1fr'
    },
    width: {
      '128': '32rem'
    }
  },
  plugins: [],
};
