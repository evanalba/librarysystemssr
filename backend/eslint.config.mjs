import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import configPrettier from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  configPrettier,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {js,},
    languageOptions: {
      globals: globals.node,
    },
  },
]);
