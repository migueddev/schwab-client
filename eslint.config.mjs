import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  // Basic configuration for JS
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    ...pluginJs.configs.recommended,
  },
  // Configuration for TS
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'prettier': eslintPluginPrettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Za-z_]+$',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^[A-Za-z_]+$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreClassWithStaticInitBlock: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
        },
      ],
    },
  },
  eslintConfigPrettier,
];
