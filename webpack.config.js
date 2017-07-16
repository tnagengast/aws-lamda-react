var path = require('path');
var glob = require('glob');
var nodeExternals = require('webpack-node-externals');
let dotenv = require('dotenv')

// Required for Create React App Babel transform
process.env.NODE_ENV = 'production';

module.exports = {

    entry: path.resolve('./src/lambda'),

    target: 'node',

    externals: [nodeExternals()],

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            // include: __dirname,
            exclude: /node_modules/,

            // loader: 'babel-loader' + Mix.babelConfig()
        }]
    },
    // We are going to create multiple APIs in this guide, and we are
    // going to create a js file to for each, we need this output block
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
};

// function globEntries(globPath) {
//     var files = glob.sync(globPath);
//     var entries = {};
//
//     for (var i = 0; i < files.length; i++) {
//         var entry = files[i];
//         entries[path.basename(entry, path.extname(entry))] = './' + entry;
//     }
//
//     return entries;
// }
