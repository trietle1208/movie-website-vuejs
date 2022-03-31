module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    spinner: (theme) => ({
      default: {
        color: "#dae1e7",
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
    }),
  },
  plugins: [
    require("tailwindcss-spinner")({
      className: "spinner",
      themeKey: "spinner",
    }),
  ],
}
