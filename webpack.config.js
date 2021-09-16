const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
console.log(isProd)
console.log(isDev)
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: filename('js'),
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            },
            filename: filename('html'), // название выходного файла
        }),
    ],

    module: {
        rules: [

            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                enforce: 'pre',
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src/views'),
                use: {
                    loader:  'html-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        // interpolate: true,
                    },
                }
            },

        ]
    },
    devServer: {
        historyApiFallback: true,
        index: 'bundle.html',
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 3001,
    },

}
