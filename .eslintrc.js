module.exports = {
    "rules": {
        "indent": ["error", 4],
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "no-new": 0,
        "no-use-before-define": 0
    },
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ]
};