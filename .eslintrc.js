module.exports = {
  env: {
    'jest/globals': true
  },
  extends: ['standard', 'standard-with-typescript', 'standard-react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react', 'jest'],
  rules: {
    'react/prop-types': 'off'
  }
}
