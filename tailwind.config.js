// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{html,js}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
            },
            colors: {
                'tech': {
                    dark: '#0a1628',
                    navy: '#1a3a5c',
                    blue: '#2d7dd2',
                    light: '#4a9eff',
                    bg: '#e8f0fe',
                }
            }
        },
    },
    plugins: [],
}