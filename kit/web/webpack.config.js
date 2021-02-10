const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';

var babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: [
            "@babel/react",
            "@babel/env",
        ]
    }
};

module.exports = {
    mode: webpackEnv,
    cache: true,
    entry: {
        app: path.join(rootDir, './index.web.ts'),
    },
    output: {
        path: path.resolve(rootDir, 'dist'),
        filename: 'app-[fullhash].bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(tsx|ts)$/,
                // exclude: /node_modules/,
                // include: [rootDir, path.join(rootDir, '/node_modules/react-native-super-grid/')],
                use: [babelLoader, 'ts-loader']
            },
            {
                test: /\.(jsx|js|mjs)$/,
                // exclude: /node_modules/,
                // include: [rootDir, path.join(rootDir, '/node_modules/react-native-super-grid/')],
                use: babelLoader
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: [
            '.web.tsx',
            '.web.ts',
            '.tsx',
            '.ts',
            '.web.jsx',
            '.web.js',
            '.jsx',
            '.js',
        ], // read files in fillowing order
        alias: Object.assign({
            'react-native$': 'react-native-web',
        }),
    },
};
