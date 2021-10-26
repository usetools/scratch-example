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
const GCLibraryPlugin = require('google-closure-library-webpack-plugin');

module.exports = override(
  // webpack alias
  addWebpackAlias({
    '@src': path.resolve(__dirname, './src'),
  }),
  // 复制scratch-blocks中的媒体资源到当前项目
  addWebpackPlugin(
    new CopyWebpackPlugin({
      patterns: [{
        from: 'node_modules/scratch-blocks/media',
        to: 'static/blocks-media'
      }]
    })
  ),
  // 解析 google-closure-library 
  addWebpackPlugin(
    new GCLibraryPlugin({
      sources: [path.resolve(__dirname, 'src')]
    }),
  ),
  addExternalBabelPlugins(
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-object-rest-spread',
  ),
  // 配置实时构建scratch工具
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
  // antd 按需加载配置，babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 配置项目使用less
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    }
  }),
);
