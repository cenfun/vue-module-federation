// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const VueLoaderPlugin = require(`vue-loader`).VueLoaderPlugin;

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8083,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        new VueLoaderPlugin(),

        new MiniCssExtractPlugin(),

        new ModuleFederationPlugin({
            name: 'sub2',
            filename: 'sub2.js',
            remotes: {
                app: 'app@http://localhost:8081/app.js',
            },
            exposes: {
                "./Sub2": "./src/sub2.vue"
            },
            shared: ['vue']
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.vue$/i,
                use: 'vue-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};