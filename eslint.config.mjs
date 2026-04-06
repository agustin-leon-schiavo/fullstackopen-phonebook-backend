import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylistic.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
    },
  },
  {
    ignores: ['dist', 'node_modules', '.env'],
  },
]
