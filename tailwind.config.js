/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css,scss}', // Include your SCSS files here
    './node_modules/**/*.{css,scss}', // Include your SCSS files here
  ],
  theme: {
    /**
     * https://tailwindcss.com/docs/font-size
     * Version - v3.2.4
     * */
    fontSize: {
      xs: ['0.75rem', '1rem'] /* 12px */,
      sm: ['0.875rem', '1.25rem'] /* 14px (Body Text)*/,
      base: ['1rem', '1.5rem'] /* 16px (Small Text)*/,
      lg: ['1.125rem', '1.75rem'] /* 18px (Normal Text)*/,
      xl: ['1.25rem', '1.75rem'] /* 20px (Medium Text)*/,
      large: ['1.375rem'] /* 22px (Large Text)*/,
      '2xl': ['1.5rem', '2rem'] /* 24px (heading 7)*/,
      '3xl': ['1.875rem', '2.25rem'] /* 30px */,
      '4xl': ['2.25rem', '2.5rem'] /* 36px */,
      '5xl': ['3rem', 1] /* 48px */,
      '6xl': ['3.75rem', 1] /* 60px */,
      '7xl': ['4.5rem', 1] /* 72px */,
      '8xl': ['6rem', 1] /* 96px */,
      '9xl': ['8rem', 1] /* 128px */,
      heading6: ['1.625rem'] /* 26px (heading 6)*/,
      heading5: ['1.875rem'] /* 30px (heading 5)*/,
      heading4: ['2.5rem'] /* 40px (heading 4)*/,
      heading3: ['3rem'] /* 48px (heading 3)*/,
      heading2: ['3.375rem'] /* 54px (heading 2)*/,
      heading1: ['5rem'] /* 80px (heading 1)*/,
    },
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      colors: {
        /* Brand Color */
        primary: '#4c0055',

        /* State Color */
        info: '#d2bfd5',
        success: '#824c88',
        warning: '#ff8300',
        error: '#de2a00',

        /* Neutral Color */
        'dark-gray1': '#43474d',
        'dark-gray2': '#929597',
        'light-gray': '#e0e0e0',
        'lighter-gray': '#eeeeee',
        'baltic-sea': '#3a3e43',
        'dark-gray3': '#3E3E3E',
        'dark-gray4': '#272828',

        /* Action Color */
        hover: '#b799bb',
        selection: '#fe5000',
        'dark-purple': '#2e002e',

        /* Other Color */
        'sea-green': '#29AC62',
        'saudi-flag': '#006C35',
        'princeton-orange': '#F37B20',
        'grey-color': '#F5F5F5',
      },
      scale: {
        flip: '-1',
      },
    },
  },
  plugins: [],
};
