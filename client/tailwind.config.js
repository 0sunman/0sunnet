module.exports = {
  purge: ['./pages/**/*.js','./components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        gray_1:"#090909",
        gray_2:"#313131"
      },
      height:{
        calc_100_44:"calc(100% - 44px)",
      },
      maxHeight:{
        m750:"750px"
      }

    },
  },
  variants: {
    extend: {},
  }
}
