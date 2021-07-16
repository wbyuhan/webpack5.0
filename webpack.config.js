const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = process.cwd();

module.exports = {

    entry: "./src/index.js",
    output: {
        path: path.resolve(rootDir, 'dist'),
        filename: "boundle.[contenthash:8].js"
    },
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, "./public/index.html"),
            inject: 'body',
            scriptLoading: 'blocking',
        })
    ]

}