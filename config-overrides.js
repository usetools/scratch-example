const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  babelInclude,
  addExternalBabelPlugins,
} = require('customize-cra');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = override(
  addWebpackAlias({
    '@src': path.resolve(__dirname, './src'),
  }),
  addWebpackPlugin(
    new CopyWebpackPlugin({
      patterns: [{
        from: 'node_modules/scratch-blocks/media',
        to: 'static/blocks-media'
      }]
    })
  ),
  addExternalBabelPlugins(
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-add-module-exports',
  ),
  babelInclude([
    path.resolve('src'),
    path.resolve('node_modules/scratch-blocks/src'),
    path.resolve('node_modules/scratch-render/src'),
    path.resolve('node_modules/scratch-render-fonts/src'),
    path.resolve('node_modules/scratch-storage/src'),
    path.resolve('node_modules/scratch-svg-renderer/src'),
    path.resolve('node_modules/scratch-vm/src'),
    path.resolve('node_modules/pify'),
    path.resolve('node_modules/@vernier/godirect'),
  ]),
);
