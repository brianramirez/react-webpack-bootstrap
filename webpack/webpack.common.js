const merge = require("webpack-merge");
const PATHS = require("./paths");
const parts = require("./webpack.parts");

module.exports = merge([
    parts.resolveExtensions(),
    parts.loadJavascript({ include: PATHS.app, exclude: /node_modules/ }),
    parts.loadCSS(),
    {
        stats: "errors-only"
    }
]);
