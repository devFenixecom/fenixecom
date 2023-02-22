/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                "primary500": "#795ECB",
                "primary600": "#8F70ED",
                "background": "#101012",
                "placeholder": "#707070",
                "textcolor": "#EEEEEE",
                "secondbg": "#292A33",
                "inputbg": "#1F2026",
            },


        },
    },
    plugins: [],
}