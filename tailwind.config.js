/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{ 
        transparent: 'transparent',
        current: 'currentColor',
        boxBackgroundColor: '#121212',
        pageBackgroundColor: '#000',
        linkColor: '#b3b3b3',
        white: '#ffffff',
        blue: '#5179a1',
        black: '#000000',
        green: '#1ed760',
        subdued: '#b3b3b3',
        highlight: '#1f1f1f',
        hoverBackgroundColor: '#ffffff1a',
        tinted: '#ffffff4d',
        tintedBase: '#ffffff1a',
        decorativeSubdued: '#282828',
        lightDecorativeSubdued: '#7f7f7f',
        gradiantBack: '#00000080',
        opacityBacground: '#00000060',
      },
      boxShadow: {
        emptyBox: '0 4px 60px rgba(0,0,0,.5)'
      },
      rotate: {
        '25': '25deg'
      },
      gridTemplateColumns: {
        'custom-layout': '16px 40px minmax(0px, 6fr) minmax(0px, 4fr) minmax(0px, 3fr) minmax(40px, 60px)',
        'custom-layout-md': '16px 40px minmax(0px, 1fr) minmax(0px, 1fr) minmax(40px, 60px)',
        'custom-layout-sm': '16px 40px minmax(0px, 1fr) minmax(40px, 60px)',
        'custom-base-layout': 'minmax(min-content, 350px) 1fr',
        'navbar-layout': 'min-content auto'
      },
      width: {
        '128': '32rem'
      },
      backgroundColor: {
        dropdownBg: 'rgba(0, 0, 0, 0.7)'
      },
    },
  },
  plugins: [],
};
