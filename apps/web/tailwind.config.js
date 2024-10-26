const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdex}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdex}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdex}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10107B',
        secondary: '#7848F4',
        text_pri: '#000000',
        text_sec: '#F8F8FA',
        text_third: '#131315',
        text_gray: '#7E7E7E',
      }
    },
  },
  plugins: [
    require('daisyui'),
    flowbite.plugin(),
  ],
}

