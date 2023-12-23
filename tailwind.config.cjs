/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        slide: 'slide 3s linear infinite',
        jump: 'jump .5s alternate infinite'
      },
      keyframes: {
        slide: {
          '0%, 100%': { 'margin-top': '-66px' },
          '5%, 33%': { 'margin-top': '-108px' },
          '38%, 66%': { 'margin-top': '-54px' },
          '71%, 99.99%': { 'margin-top': '0px' }
        },
        jump: {
          from: {
            transform: 'translateY(0px)'
          },
          to: {
            transform: 'translateY(-25px)'
          }
        }
      },
      dropShadow: {
        'skill': '0 0 10px be38f3'
      },
    },
    variants: {
      extend: {
        transform: ['hover', 'focus'],
      },
    },
    plugins: [
      function ({ addBase }) {
        addBase({
          '.perspective-1500': {
            perspective: '1500px',
          },
        })
      }
    ]
  }
}
