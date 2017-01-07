module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "globals": {
      "APP_URL": true,
      "Customers": true,
      "Users": true,
      "Countries": true,
      "Sequelize": true,
      "sequelize": true,
      "describe": true,
      "before": true,
      "beforeEach": true,
      "after": true,
      "afterEach": true,
      "it": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0
    }
};