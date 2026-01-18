export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      /* Semicolons */
      semi: ['error', 'always'],

      /* Arrow functions */
      'arrow-parens': ['error', 'as-needed'],
      'arrow-spacing': ['error', { before: true, after: true }],

      /* Basic formatting */
      indent: ['error', 2],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],

      'no-confusing-arrow': 'off',
    },
  },
];
