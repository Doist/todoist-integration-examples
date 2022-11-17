module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
    },
    env: {
        node: true,
        jest: true,
    },
    extends: [
        '@doist/eslint-config/recommended-requiring-type-checking',
        '@doist/eslint-config/simple-import-sort',
    ],
    root: true,
    ignorePatterns: ['scripts/', 'dist/', '.eslintrc.js', 'global-setup.js', 'jest.config.js'],
    rules: {
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
    },
    overrides: [
        {
            files: ['*.spec.*', 'fixtures.ts'],
            rules: {
                '@typescript-eslint/unbound-method': 'off',
                'no-restricted-imports': 'off',
            },
        },
    ],
}
