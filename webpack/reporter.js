const chalk = require("chalk");

const { log, clear } = console;

/**
 * The file used by Webpack Dev Middleware to emit messages to the terminal while
 * running our custom Webpack dev server. You can customize this file to change the
 * behavior of the output displayed in the terminal.
 */

module.exports = PORT => (middlewareOptions, options) => {
    const { log: logger, state, stats } = options;

    if (!state) {
        clear();
        log(chalk.bgHex("#0000FF")(" INFO "), chalk.white("Recompiling..."));
    }

    if (state) {
        const displayStats = middlewareOptions.stats !== false;

        if (displayStats) {
            if (stats.hasErrors()) {
                logger.error(stats.toString(middlewareOptions.stats));
            } else if (stats.hasWarnings()) {
                logger.warn(stats.toString(middlewareOptions.stats));
            } else {
                const { startTime, endTime } = stats;
                logger.info(stats.toString(middlewareOptions.stats));
                clear();
                log(
                    chalk.bgHex("#006400")("  DONE  "),
                    chalk.white(`Recompiled successfully in ${endTime - startTime}ms`)
                );
                log();
                log(chalk.white(`Running on http://localhost:${PORT}`));
            }
        }

        let message = "Compiled successfully.";

        if (stats.hasErrors()) {
            message = "Failed to compile.";
        } else if (stats.hasWarnings()) {
            message = "Compiled with warnings.";
        }
        logger.info(message);
    } else {
        logger.info("Compiling...");
    }
};