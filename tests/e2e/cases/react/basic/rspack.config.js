const { rspack } = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");

/** @type { import('@rspack/core').RspackOptions } */
module.exports = {
	context: __dirname,
	mode: "development",
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: {
								syntax: "ecmascript",
								jsx: true
							},
							transform: {
								react: {
									runtime: "automatic",
									development: true,
									refresh: true
								}
							}
						}
					}
				}
			}
		]
	},
	devtool: false,
	plugins: [
		new rspack.HtmlRspackPlugin({ template: "./src/index.html" }),
		new ReactRefreshPlugin()
	],
	entry: "./src/index.jsx",
	devServer: {
		hot: true
	},
	stats: "none",
	infrastructureLogging: {
		debug: false
	},
	watchOptions: {
		poll: 1000
	},
	experiments: {
		css: true
	}
};
