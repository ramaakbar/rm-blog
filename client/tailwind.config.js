const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        base: "var(--base)",
        "base-focus": "var(--base-focus)",
        "base-2": "var(--base-2)",
        "base-2-focus": "var(--base-2-focus)",
        "base-content": "var(--base-content)",
        "base-content-2": "var(--base-content-2)",
        "base-content-3": "var(--base-content-3)",
        "base-content-inverse": "var(--base-content-inverse)",
        overlay: "var(--overlay)",
        "overlay-focus": "var(--overlay-focus)",
        "overlay-2": "var(--overlay-2)",
        "overlay-2-focus": "var(--overlay-2-focus)",
        "overlay-content": "var(--overlay-content)",
        "overlay-content-2": "var(--overlay-content-2)",
        "overlay-content-3": "var(--overlay-content-3)",
        "overlay-content-inverse": "var(--overlay-content-inverse)",
        line: "var(--line)",
        "line-focus": "var(--line-focus)",
        input: "var(--input)",
        "input-focus": "var(--input-focus)",
        "input-content": "var(--input-content)",
        "input-content-2": "var(--input-content-2)",
        primary: "var(--primary)",
        "primary-focus": "var(--primary-focus)",
        "primary-subtle": "var(--primary-subtle)",
        "primary-content": "var(--primary-content)",
        "primary-content-inverse": "var(--primary-content-inverse)",
        "primary-subtle-content": "var(--primary-subtle-content)",
        secondary: "var(--secondary)",
        "secondary-focus": "var(--secondary-focus)",
        "secondary-subtle": "var(--secondary-subtle)",
        "secondary-subtle-content": "var(--secondary-subtle-content)",
        "secondary-content": "var(--secondary-content)",
        "secondary-content-inverse": "var(--secondary-content-inverse)",
        info: "var(--info)",
        "info-focus": "var(--info-focus)",
        "info-subtle": "var(--info-subtle)",
        "info-subtle-content": "var(--info-subtle-content)",
        "info-content": "var(--info-content)",
        "info-content-inverse": "var(--info-content-inverse)",
        danger: "var(--danger)",
        "danger-focus": "var(--danger-focus)",
        "danger-subtle": "var(--danger-subtle)",
        "danger-subtle-content": "var(--danger-subtle-content)",
        "danger-content": "var(--danger-content)",
        "danger-content-inverse": "var(--danger-content-inverse)",
        success: "var(--success)",
        "success-focus": "var(--success-focus)",
        "success-subtle": "var(--success-subtle)",
        "success-subtle-content": "var(--success-subtle-content)",
        "success-content": "var(--success-content)",
        "success-content-inverse": "var(--success-content-inverse)",
        warning: "var(--warning)",
        "warning-focus": "var(--warning-focus)",
        "warning-subtle": "var(--warning-subtle)",
        "warning-subtle-content": "var(--warning-subtle-content)",
        "warning-content": "var(--warning-content)",
        "warning-content-inverse": "var(--warning-content-inverse)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
