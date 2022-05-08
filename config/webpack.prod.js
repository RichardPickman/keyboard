const common = require('./webpack.common.js');
const paths = require('./webpack.paths.js');

const { commonModules, commonPlugins, commonResolve } = common;

module.exports = {
    mode: 'production',
    entry: [paths.src + '/index.js'],
    output: {
        path: paths.build,
        filename: '[name].[hash].js',
        assetModuleFilename: '[file]',
        clean: true,
    },
    module: {
        ...commonModules
    },
    plugins: [
        ...commonPlugins
    ],
    resolve: {
        ...commonResolve
    }
}
