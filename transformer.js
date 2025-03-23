const upstreamTransformer = require('metro-react-native-babel-transformer');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.css')) {
    return new Promise((resolve, reject) => {
      postcss([
        tailwindcss,
        autoprefixer,
        postcssPresetEnv({ stage: 1 })
      ])
      .process(src, { from: filename })
      .then(result => {
        resolve({
          code: `module.exports = ${JSON.stringify(result.css)}`,
        });
      })
      .catch(error => {
        console.error('CSS processing error:', error);
        resolve({
          code: `module.exports = ${JSON.stringify(src)}`,
        });
      });
    });
  }
  return upstreamTransformer.transform({ src, filename, options });
}; 