const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const NODE_ENV = process.env.NODE_ENV
let webpackConfig = {
	entry: {
		"main": NODE_ENV === 'development' ? './src/main.js' : './src/export.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: NODE_ENV === 'development' ? '' : '/dist/',
		filename: "[name].js",
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{　　　　　　
				test: /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/,
				loader: 'file-loader?limit=8192&&name=img/[name].[ext]'
			},
		]
	},
	plugins: [new VueLoaderPlugin()]
}
if(NODE_ENV === 'development') {
	webpackConfig.plugins.unshift(new HtmlWebpackPlugin({
		filename: 'index.html',
		template: './index.html',
		inject: true,
		title: 'vue-element-admin',
		chunks: ['main']
	}))
}
module.exports = webpackConfig