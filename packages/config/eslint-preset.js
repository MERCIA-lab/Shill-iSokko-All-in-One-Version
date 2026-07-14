/** Shared ESLint preset for all imeek-commerce workspaces */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  env: { node: true, es2022: true },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": [
      "warn",
      { "newlines-between": "always", alphabetize: { order: "asc" } }
    ]
  },
  ignorePatterns: ["dist", ".next", "node_modules", "build"]
};
