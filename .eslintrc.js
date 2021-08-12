module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    '@typescript-eslint',
    'graphql',
    'jsx-control-statements',
    '@typescript-eslint',
  ],
  extends: [
    '@callstack',
    'plugin:jsx-control-statements/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-raw-text': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-no-undef': ['error', {allowGlobals: true}],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
          },
          {
            pattern: '@explore/**',
            group: 'external',
          },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: ['metro.config.js'],
};
