const { default: daisyui } = require('daisyui');
const { default: themes } = require('daisyui/theme/object');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  plugins: [require("daisyui")],
  daisyui:{
    themes: ["dark"]
  },
};