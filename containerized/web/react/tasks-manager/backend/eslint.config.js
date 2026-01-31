import globals from "globals";
import { baseConfig } from "../../../../../shared/eslint/configs/base.js";

export default [
  ...baseConfig,
  {
    ignores: ["dist/**"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off", // Allow console in backend
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
];
