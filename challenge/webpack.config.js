const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
	entry: {
		//JS bundles
		index: "./public/javascripts/index.js",
		//css bundles
		"index-css": "./public/stylesheets/index-css.js",
	},
	output: {
		path: path.join(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			chunks: ["index", "index-css"],
			template: "./views/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'tables.json' }
			],
		})
	],
	module: {
		rules: [{
			test: /\.s[ac]ss$/i,
			use: [
				// Create a separate file for css
				MiniCssExtractPlugin.loader,
				// Translates CSS into CommonJS
				"css-loader",
				// Compiles Sass to CSS
				"sass-loader"
			]
		}]
	}
};