// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    "document": true,
    "window": true
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'arrow-parens': 0,
    "eol-last": 0,
    "eqeqeq": 0,
    'generator-star-spacing': 'off',
    "init-declarations": 0,
    "indent": 0,
    "lines-around-comment": 0,
    "quotes": 0,
    "semi": [2, "always"],
    "spaced-comment":0,
    "space-in-parens": [0, "never"],
    "space-after-keywords": [0, "always"],
    "space-before-function-paren": [0, "always"],
    "space-infix-ops":0,
    "keyword-spacing": 0,
    "key-spacing":0,
    "no-multiple-empty-lines": [1, {"max": 2}],
    "no-undef": 0,
    "no-useless-return": 0,
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
