const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const history = require('connect-history-api-fallback');
const express = require('express');
const chalk = require('chalk');
const portfinder = require('portfinder');
const { exec } = require('child_process');

const DEFAULT_PORT = 3000;
let currentPort = DEFAULT_PORT;
const { log, clear } = console;

const config = require('./webpack.dev');
const reporter = require('./reporter')(currentPort);

const app = express();
const compiler = webpack(config);

const instance = middleware(compiler, {
    stats: "errors-only",
    hot: true,
    historyApiFallback: true,
    overlay: true,
    compress: true,
    publicPath: config.output.publicPath,
    logLevel: "warn",
    reporter,
});

app.use(history());
app.use(instance);
app.use(
    hotMiddleware(compiler, {
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000,
        log: false,
    }),
);

let start;
let end;

instance.waitUntilValid(() => {
    end = Date.now();

    const elapsedTime = end - start;
    const localhostURL = `http://localhost:${currentPort}`;

    clear();

    log(chalk.bgHex("#006400")(" DONE "), chalk.white(`Compiled successfully in ${elapsedTime}ms`));
    log();
    log(chalk.white(`Running on ${localhostURL}`));
    exec(`open ${localhostURL}`);
});

app.listen(currentPort, reportAppListening).on("error", async e => {
    if (e.code === "EADDRINUSE") {
        const nextPort = await portfinder.getPortPromise({ port: DEFAULT_PORT });
        currentPort = nextPort;
        app.listen(currentPort, reportAppListening);
    }
});

function reportAppListening() {
    start = Date.now();
    clear();
    log(chalk.bgHex("#0000FF")(" INFO "), chalk.white("Starting development server..."));
}