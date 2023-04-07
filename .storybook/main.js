module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    check: true,
    checkOptions: {},
  },
  features: {
    postcss: false,
    previewCsfV3: false,
    buildStoriesJson: true,
    storyStoreV7: false,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-styling',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
