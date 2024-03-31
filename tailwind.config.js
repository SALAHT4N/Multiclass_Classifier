/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  safelist: [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9", // add class names here
    "grid-cols-10",
    "grid-cols-11",
    "grid-cols-12",
    // You can also use patterns to match class names
  ],
  plugins: [require("daisyui")],
};
