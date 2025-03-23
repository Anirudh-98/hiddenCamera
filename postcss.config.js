module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({ 
      stage: 1,
      features: {
        'nesting-rules': true,
      },
      autoprefixer: {
        flexbox: 'no-2009',
      },
    }),
  ],
}; 