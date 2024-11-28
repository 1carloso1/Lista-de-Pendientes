import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Archivos que se incluirán
    languageOptions: {
      globals: globals.browser, // Definición de globals
    },
    rules: {
      // Aquí defines tus reglas personalizadas
      "react/react-in-jsx-scope": "off", // React 17+ no requiere importar React
      "react/prop-types": "off",        // Si usas TypeScript para validar props
    },
  },
  pluginJs.configs.recommended,      // Reglas recomendadas para JavaScript
  ...tseslint.configs.recommended,  // Reglas recomendadas para TypeScript
  pluginReact.configs.flat.recommended, // Reglas recomendadas para React
];
