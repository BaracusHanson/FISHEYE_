import globals from "globals";

/** @type {import('eslint').Linter.Config} */
export default {
  languageOptions: {
    globals: globals.browser, // Utilisation des variables globales du navigateur
    parserOptions: {
      ecmaVersion: 2021, // ECMAScript 2021
      sourceType: "module", // Spécifie que nous utilisons des modules ES
    },
  },
  rules: {
    "no-console": "warn", // Avertir lors de l'utilisation de console.log
    semi: ["error", "always"], // Obliger l'utilisation des points-virgules
    quotes: ["error", "double"], // Utiliser des guillemets doubles
    eqeqeq: "error", // Toujours utiliser === et !== au lieu de == et !=
  },
};
