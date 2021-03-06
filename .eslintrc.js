module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  plugins: ["react", "prettier", "@typescript-eslint", "react-hooks"],
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __DEV__: "readonly",
    JSX: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/ban-ts-ignore": [0],
    "@typescript-eslint/camelcase": [0],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": [0],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: { regex: "^I[A-Z]", match: true },
      },
    ],
    "@typescript-eslint/no-unused-expressions": [1],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        ".svg": "never",
      },
    ],
    "import/no-extraneous-dependencies": ["error", { packageDir: "./" }],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: false },
      },
    ],
    // fix bug
    "no-use-before-define": [0],
    "@typescript-eslint/no-use-before-define": [1],
    // fix bug
    "no-unused-vars": [0],
    "@typescript-eslint/no-unused-vars": [2],
    // fix bug
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [2],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "react/jsx-props-no-spreading": [0],
    "react/prop-types": [0],
    "react/require-default-props": [0],
    "no-nested-ternary": [0],
    "no-console": [0],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"],
        paths: ["./"],
      },
    },
  },
};
