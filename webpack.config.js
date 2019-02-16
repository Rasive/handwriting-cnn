const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        publicPath: '.',
        libraryTarget: 'umd'
    },
    node: {
        fs: 'empty'
    }
}