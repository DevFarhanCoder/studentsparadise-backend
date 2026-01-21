module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_|next" }],
    "@typescript-eslint/no-require-imports": "off",
  },
};
