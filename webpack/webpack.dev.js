const merge = require('webpack-merge');
const webpack = require('webpack');
const PATHS = require('./paths');
const parts = require('./webpack.parts');
const common = require('./webpack.common');

const devConfig = merge([
    {
        output: {
            publicPath: "/",
            path: PATHS.app,
        },
        entry: ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", "./src/index.js"],
    },
    {
        plugins: [new webpack.HotModuleReplacementPlugin()]
    },
    parts.generateSourceMaps({ type: "cheap-module-eval-source-map" }),
    parts.loadHTML({ template: "./public/index.html" }),
    parts.loadImages({
        options: {
            limit: 10000,
            name: "[name].[hash].[ext]"
        },
    }),
    parts.loadFonts({
        options: {
            limit: 10000,
            name: "[name].[hash].[ext]"
        },
    }),
]);

module.exports = merge(common, devConfig, { mode: "development" });
