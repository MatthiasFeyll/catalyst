function run() {
    const envLoadingResult = require('dotenv').config({
        path: ".env.test",
    });

    if (envLoadingResult.error) {
        throw envLoadingResult.error
    }
}

run();