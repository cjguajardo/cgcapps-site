/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        slide: "slide 3s linear infinite",
        jump: "jump .5s alternate infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        bounceIn: "bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        shake: "shake 0.5s ease-in-out",
        progress: "progress 2s ease-in-out infinite",
      },
      keyframes: {
        slide: {
          "0%, 100%": { "margin-top": "-66px" },
          "5%, 33%": { "margin-top": "-108px" },
          "38%, 66%": { "margin-top": "-54px" },
          "71%, 99.99%": { "margin-top": "0px" },
        },
        jump: {
          from: {
            transform: "translateY(0px)",
          },
          to: {
            transform: "translateY(-25px)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        bounceIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
          "70%": {
            transform: "scale(0.9)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-5px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(5px)",
          },
        },
        progress: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      dropShadow: {
        skill: "0 0 10px be38f3",
      },
    },
    variants: {
      extend: {
        transform: ["hover", "focus"],
      },
    },
    plugins: [
      function ({ addBase }) {
        addBase({
          ".perspective-1500": {
            perspective: "1500px",
          },
        });
      },
    ],
  },
};
