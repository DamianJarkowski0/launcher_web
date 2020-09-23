module.exports = {
    "parser": "babel-eslint",
    'env': {
      'browser': true,
      'es6': true,
    },
    "plugins": [
        "react"
    ],
    'extends': [
        'plugin:react/recommended','samrap',
    ],
    'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
      "ecmaVersion": 6,
      "ecmaFeatures": {
          "jsx": true,
          "modules": true,
          "experimentalObjectRestSpread": true
      },
      'sourceType': 'module',
    },
    'rules': {
      "max-len": [1, {"code": 120, "tabWidth": 4, "ignoreUrls": true, "ignoreComments": true}]
    },
  };
  