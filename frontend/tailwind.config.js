/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base theme colors
        primary: '#0f172a',
        white: '#ffffff',

        // Light theme
        light: {
          background: '#1070b8',
          text: '#000000',
          'blue-shade': {
            50: '#e0f1fb',
            100: '#b3dbf5',
            200: '#80c4ef',
            300: '#4dade8',
            400: '#1a97e2',
            500: '#1070b8',
            600: '#0c5c97',
            700: '#094876',
            800: '#063455',
            900: '#032033',
          },
        },

        // Dark theme
        dark: {
          background: '#0f172a',
          text: '#ffffff',
          'blue-shade': {
            50: '#cbd8f0',
            100: '#a5bee7',
            200: '#7fa4dd',
            300: '#598ad4',
            400: '#3370cb',
            500: '#1c5ab1',
            600: '#15468a',
            700: '#0e3263',
            800: '#071e3c',
            900: '#010a15',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 