const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DemoPlugin = require('../plugin/DemoPlugin')
const DeletePlugin = require('../plugin/DeletePlugin')

const rootDir = process.cwd();

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(rootDir, 'dist'),
        filename: "boundle.[contenthash:8].js"
    },
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                use: "babel-loader",
                include: path.resolve(rootDir, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            import: true,
                            modules: {
                                mode: "local",
                                auto: true,
                                exportGlobals: true,
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                localIdentContext: path.resolve(__dirname, "src"),
                                localIdentHashSalt: "my-custom-hash",
                                namedExport: true,
                                exportLocalsConvention: "camelCase",
                                exportOnlyLocals: false,
                            },
                        }
                    },
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer"]
                                ]
                            }
                        }
                    }
                ],

            },
            {
                test: /\.js$/,
                use: [{
                        loader: path.resolve('./loader/console.js'),
                        options: { /* ... */ }
                    },


                ]
            }
        ]
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, "./public/index.html"),
            inject: 'body',
            scriptLoading: 'blocking',
        }),

        new CopyWebpackPlugin({
            patterns: [{
                from: '*.js',
                context: path.resolve(rootDir, "public/js"),
                to: path.resolve(rootDir, 'dist/js'),
            }, ],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new OptimizeCssPlugin(),
        new DemoPlugin({
            filename: "index.js"
        }),
        new DeletePlugin({
            exclude: [/\.css$/i, "index.html"],
        })
    ]
}