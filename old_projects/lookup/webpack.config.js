let Encore = require('@symfony/webpack-encore');
const path = require('path');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .addEntry('app', './assets/ts/app.ts')
    .addEntry('home_index', './assets/ts/pages/home/index.ts')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())



    .enableSassLoader()
    .enableTypeScriptLoader()
    //.enableForkedTypeScriptTypesChecking()
;

let config = Encore.getWebpackConfig()
config.resolve.alias["~"] = path.resolve(__dirname, 'assets')

module.exports = config
