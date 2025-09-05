import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Ignore thư mục
  globalIgnores(['dist', '.eslintrc.cjs']),

  {
    // Áp dụng cho file JS/JSX
    files: ['**/*.{js,jsx}'],

    // Kế thừa các config
    extends: [
      js.configs.recommended,
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite, // bổ sung từ đoạn 2
    ],

    // Cấu hình ngôn ngữ
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser, // bổ sung từ đoạn 2
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    // Settings cho React
    settings: {
      react: { version: '18.2' },
    },

    // Plugins
    plugins: {
      'react-refresh': reactRefresh,
    },

    // Rules
    rules: {
      'react/jsx-no-target-blank': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // cập nhật từ đoạn 2
      'no-debugger': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]);