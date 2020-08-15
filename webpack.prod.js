// Cuando el paquete tiene la palabra 'plugin' hay que hacer la 
// configuración adicional de definir la const y el require.
const HtmlWebPackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');

const CopyPlugin                = require('copy-webpack-plugin');

const MinifyPlugin              = require('babel-minify-webpack-plugin');

const { CleanWebpackPlugin }    = require('clean-webpack-plugin');




module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        filename: 'main.[contentHash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'],
            },
            {
                test: /styles\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    esModule: false
                },
            },
            {   test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false,
        }),
       new CopyPlugin({
           patterns : [
            { from: 'src/assets', to: 'assets/' },
           ],
       }),
       new MinifyPlugin({},
        { test: /\.js($|\?)/i } ),
        
       new CleanWebpackPlugin(),
]
}