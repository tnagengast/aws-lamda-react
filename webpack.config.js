let path = require('path');
let glob = require('glob');
let nodeExternals = require('webpack-node-externals');
let dotenv = require('dotenv');

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

    let directory = path.dirname(globPath).split('/').pop()
    let files = glob.sync(globPath);
    let entries = {};

    for (let i = 0; i < files.length; i++) {
        let entry = files[i];
        entries[directory + '-' + path.basename(entry, path.extname(entry))] = './' + entry;
    }

    return entries;
}
