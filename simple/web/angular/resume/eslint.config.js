import { baseConfig } from '../../../../shared/configs/eslint/base.js';
import globals from 'globals';

export default [
  { ignores: ['dist', 'node_modules', '.angular', '**/*.html'] },
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Angular-specific rules can be added here once the plugin is properly configured
    },
  },
];
