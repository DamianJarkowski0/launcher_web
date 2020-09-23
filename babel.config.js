module.exports = {
    presets: [
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-react-jsx',
    ],
    env: {
        production: {
            only: ['app'],
            plugins: [
                'lodash',
                'transform-react-remove-prop-types',
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
                "@babel/plugin-transform-react-jsx",
            ],
        },
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                'dynamic-import-node',
            ],
        },
    },
};
