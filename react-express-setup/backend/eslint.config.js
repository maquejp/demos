import tseslint from 'typescript-eslint';
import globals from 'globals';
import { baseConfig } from '../../base.eslint.js';

export default tseslint.config(
  ...baseConfig,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  { ignores: ['dist'] },
);
