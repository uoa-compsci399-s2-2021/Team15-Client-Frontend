module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-undef': 'off',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-indent-props': 'off',
    'object-curly-spacing': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'object-curly-newline': 'off',
    'prefer-destructuring': 'off',
    'react/destructuring-assignment': 'off',
    'import/newline-after-import': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-nested-ternary': 'off',
    'no-useless-escape': 'off',
    'no-lonely-if': 'off',
    'prefer-template': 'off',
    'max-len': 'off',
    'import/no-cycle': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-dupe-keys': 'off',
  },
};
