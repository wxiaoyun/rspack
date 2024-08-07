const rspack = require("@rspack/core");
/** @type {import("@rspack/core").Configuration} */
module.exports = {
	target: 'web',
	devtool: "source-map",
	node: false,
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-pxtorem"]
							}
						}
					},
					{
						loader: "sass-loader"
					}
				],
				type: "css",
				generator: {
					exportsOnly: false,
				}
			}
		]
	},
	plugins: [
		new rspack.DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		})
	]
};
