var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
	entry: "./src/index.jsx",

	output: {
		filename: "bundle.js",
		path: __dirname
	},

	module : {
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader'
			}
		]
	},

	devServer: {
		port: 3000,
		historyApiFallback: {
			index: 'index.html'
		}
	},
};

module.exports = config;
