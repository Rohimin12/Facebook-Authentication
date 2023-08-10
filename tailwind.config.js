module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      fontFamily: {
        "SFProDisplay-Regular": ["SFProDisplay-Regular", "sans-serif"],
        "SFProDisplay-Medium": ["SFProDisplay-Medium", "sans-serif"],
        "SFProDisplay-bold": ["SFProDisplay-bold", "sans-serif"],
        "sans-serif": "sans-serif",
      },
      colors: {
        primary: "#1C1E21",
      },
      boxShadow: {
        default: "0 0px 10px rgba(0, 0, 0, 0.2)",
      },
      screens: {
        md: "900px",
        lg: "1075px",
      },
    },
  },
};
