/** @type {import("@rspack/core").Configuration} */
module.exports = {
	mode: "development",
	node: {
		__dirname: false,
		__filename: false
	},
	devtool: "nosources-source-map"
};
