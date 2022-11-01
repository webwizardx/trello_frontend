// Imports the Storybook's configuration API
import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
	stories: [
		'../src/stories/**/*.stories.mdx',
		'../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@chakra-ui/storybook-addon',
		'storybook-addon-next',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
};
module.exports = config;

