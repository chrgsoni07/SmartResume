const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreOnInitialization: true,
      },
    ],
    'import/newline-after-import': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true, // personal style
          pascalCase: true,
        },
      },
    ],

    // Deactivated
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'import/no-default-export': 'off', // Next.js components must be exported as default
    'import/no-extraneous-dependencies': 'off', // conflict with sort-imports plugin
    'import/order': 'off', // using custom sort plugin
    'no-redeclare': 'off', // conflict with TypeScript function overloads
    'react/jsx-fragments': 'off', // personal style
    'react/prop-types': 'off', // TypeScript is used for type checking
    'react/jsx-no-leaked-render': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    '@next/next/no-img-element': 'off', // Temporary disabled
  },
};
