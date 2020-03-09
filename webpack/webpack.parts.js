const webpack = require('webpack');
const dotenv = require('dotenv');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                include,
                exclude,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
});

exports.loadImages = ({ include, exclude, options } ={}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options
                },
            },
        ],
    },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options,
                },
            },
        ],
    },
});

exports.loadJavascript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                include,
                exclude,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
});

exports.resolveExtensions = () => ({
    resolve: {
        extensions: [".js", ".jsx"]
    },
});

exports.loadHTML = options => ({
    plugins: [new HtmlWebpackPlugin(options)],
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});

exports.env = mode => {
    const env = dotenv.config({ path: join(__dirname, `./.${mode}.env`)});
    return {
        plugins: [new webpack.DefinePlugin({ "process.env": JSON.stringify(env.parsed) })]
    };
};

exports.ignorePlugin = options => ({
    plugins: [new webpack.IgnorePlugin(options)],
});