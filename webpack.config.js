var path = require('path');
var webpack =require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: path.resolve(__dirname, 'app/main.js'),
	output: {
		filename: 'bundle-[hash].js',
		path: path.resolve(__dirname, 'public')
	},
	devServer: {
		host: "0.0.0.0",
		port:80,
    	contentBase: "./public",
    	historyApiFallback: true,
    	inline: true,
    	hot: true
	},
	module:{
		rules:[
			{
				test: /\.json$/,
				exclude: /node_modules/,
				use:[
					{
						loader: "json-loader"
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use:[
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015','react'],
							plugins:[
								['react-transform', {
									transforms: [{
										transform: "react-transform-hmr",
										imports: ["react"],
										locals: ["module"]
									}]
								}]
							]
						}
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader?modules","postcss-loader"]
				})
			}
		]
	},
	plugins:[
		new webpack.BannerPlugin("Copyright Lhg inc."),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("[name]-[hash].css")
	]
}