var path = require('path');
var glob = require('glob');
var nodeExternals = require('webpack-node-externals');
let dotenv = require('dotenv')

process.env.NODE_ENV = 'production';

module.exports =

    entry: globEntries('src/notes/!(webpack.config).js'),

    target: 'node',

    externals: [nodeExternals()],

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: __dirname,
            exclude: /node_modules/,
        }]
    },

    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
};

function globEntries(globPath) {

    var directory = path.dirname(globPath).split('/').pop()
    var files = glob.sync(globPath);
    var entries = {};

    for (var i = 0; i < files.length; i++) {
        var entry = files[i];
        entries[directory + '-' + path.basename(entry, path.extname(entry))] = './' + entry;
    }

    return entries;
}
