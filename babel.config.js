module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'jsx-control-statements',
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src',
            rootPathPrefix: '~/',
          },
          {
            rootPathSuffix: './src/features/explore',
            rootPathPrefix: '@explore/',
          },
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
