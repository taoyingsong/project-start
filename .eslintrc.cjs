module.exports = {
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.jsx', '.ts', '.tsx']
            },
            'webpack': {
                'config': 'webpack.common.js'
            },
        }
    },
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'prettier',
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'prettier/prettier': ['error', {
            "semi": false,
        }],
        'no-use-before-define': 'off',
        // '@typescript-eslint/no-use-before-define': ['error'],
        'react/function-component-definition': [
            'error',
            {
                'namedComponents': 'arrow-function',
                'unnamedComponents': 'arrow-function',
            },
        ],
        'react/jsx-filename-extension': ['error', {'extensions': ['.tsx', '.ts', '.jsx', '.js']}],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                'js': 'never',
                'jsx': 'never',
                'ts': 'never',
                'tsx': 'never'
            }
        ],
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'react/prop-types': 'off',
        'no-underscore-dangle': 'off',
        'no-plusplus': ['error', {'allowForLoopAfterthoughts': true}],
        'no-shadow': 'off',
    },
};
