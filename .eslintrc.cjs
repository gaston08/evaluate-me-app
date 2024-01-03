module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
