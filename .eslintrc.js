module.exports = {
    env: {
        node: true
    },
    extends: [
        '@lljj/eslint-config'
    ],
    globals: {
        require: true
    },
    rules: {
        "global-require": 0
    }
};
