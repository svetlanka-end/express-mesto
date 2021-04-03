module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ["react"],
  rules: {
    "no-underscore-dangle": "off",
    quotes: ["error", "double"],
    "linebreak-style": ["error", "windows"],
  },
};
