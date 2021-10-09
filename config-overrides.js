const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  babelInclude,
  addExternalBabelPlugins,
  addWebpackModuleRule,
  addLessLoader,
  fixBabelImports,
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
  ),
  babelInclude([
    path.resolve('src'),
    /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
    /node_modules[\\/]pify/,
    /node_modules[\\/]@vernier[\\/]godirect/ 
  ]),
  // 避免scratch-renderer 中加载sharder文件走到react-create-app默认配置的file-loader中，导致编译错误
  addWebpackModuleRule({
    test: /\.(vert|frag)$/i,
    use: {
      loader: './loader/vert-frag-loader.js',
    },
  }),
  // babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }), 
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    }
  }),
);
