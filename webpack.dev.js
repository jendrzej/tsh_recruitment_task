const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
    devServer: {
        contentBase: path.resolve(__dirname, "./dist/assets/media"),
        compress: true,
        port: 2000,
        stats: 'errors-only',
        open: true
      }, 
    devtool: 'inline-source-map'
});