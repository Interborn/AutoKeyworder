/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Add custom gradient
      backgroundImage: {
        'customGradient': "linear-gradient(120.55deg,#FF4040 18.56%,#A20BD8 98.01%)",
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },
  plugins: [],
};
