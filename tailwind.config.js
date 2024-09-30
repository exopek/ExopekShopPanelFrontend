// tailwind.config.js
module.exports = {
    // ...
    plugins: [require('tailwindcss-primeui'),
        "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
    ]
};