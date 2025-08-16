module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			// Add plugins here if needed, e.g., 'react-native-reanimated/plugin'
		],
	};
};
