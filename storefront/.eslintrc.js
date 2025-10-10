module.exports = {
  root: true, // important so ESLint stops searching up into /root
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    // Disable buggy Next.js rules
    "@next/next/no-page-custom-font": "off",
    "@next/next/no-html-link-for-pages": "off",

    // Some friendly defaults
    "react/react-in-jsx-scope": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
  },
};
