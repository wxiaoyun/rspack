/** @type {import("@rspack/core").Configuration} */
module.exports = {
	entry: "./index",
	mode: "development",
	stats: {
		all: false,
		modules: true,
		runtimeModules: true
	}
};
