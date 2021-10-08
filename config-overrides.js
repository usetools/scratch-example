const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackModuleRule,
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
  addWebpackModuleRule(
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
            /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
            /node_modules[\\/]pify/,
            /node_modules[\\/]@vernier[\\/]godirect/
        ],
        options: {
            // Explicitly disable babelrc so we don't catch various config
            // in much lower dependencies.
            babelrc: false,
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-async-to-generator',
                '@babel/plugin-proposal-object-rest-spread',
            ],
            presets: ['@babel/preset-env']
        }
    }
  )
);
