module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/strongly-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],

  plugins: ["@typescript-eslint"],

  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020
  },
  globals: {
    layer: true,
    store: true
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/no-multiple-template-root": "off",
    "comma-dangle": "off",
    "vue/no-v-model-argument": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-undef": "off"
  }
};
