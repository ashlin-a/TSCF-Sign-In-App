/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',"./node_modules/tailwind-datepicker-react/dist/**/*.js" ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bkg: 'rgb(var(--color-bkg)/<alpha-value>)',
        content: {
          1: 'rgb(var(--color-content1)/<alpha-value>)',
          2: 'rgb(var(--color-content2)/<alpha-value>)',
        },
        primary: 'rgb(var(--color-primary)/<alpha-value>)',
        secondary: 'rgb(var(--color-secondary)/<alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary)/<alpha-value>)',
        warning: 'rgb(var(--color-warning)/<alpha-value>)',
        success: 'rgb(var(--color-success)/<alpha-value>)',
        info: 'rgb(var(--color-info)/<alpha-value>)'
      },
      animation:{
        blob: "blob 8s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.1)"
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)"
          },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
};
