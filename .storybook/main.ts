/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {

 stories: ["../components/**/*.stories.@(ts|tsx|js|jsx|mdx)"],

  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass"), // use dart-sass
        },
      },
    ],
    include: /components/, // 👈 instead of /src/
  });
  return config;
},

};
export default config;
// import type { StorybookConfig } from '@storybook/react-vite';
// import { mergeConfig, UserConfig } from 'vite';

// // Import your custom Vite config
// import ViteConfig from './vite.config'; // adjust path as needed

// const config: StorybookConfig = {
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/addon-essentials',
//     '@chromatic-com/storybook',
//     '@storybook/addon-interactions',
//     'msw-storybook-addon',
//   ],
//   core: {
//     builder: '@storybook/builder-vite',
//   },
//   framework: {
//     name: '@storybook/react-vite',
//     options: {},
//   },
//   staticDirs: ['../public'],
//   stories: [
//     '../src/**/*.mdx',
//     '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
//   ],
//   viteFinal: async (config: UserConfig) => {
//     return mergeConfig(config, {
//       ...ViteConfig, // Spread your vite config here
//       envPrefix: 'VITE_',
//     });
//   },
// };

// export default config;
