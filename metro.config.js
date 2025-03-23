const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'css'],
    assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  },
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve('./transformer.js'),
  },
}; 