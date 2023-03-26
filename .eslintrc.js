module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['google', 'plugin:vue/recommended', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    $: true,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'guard-for-in': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: ['error', 'single'],
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'valid-jsdoc': [
      'error',
      {
        requireReturn: false,
      },
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          ArrowFunctionExpression: true,
          MethodDefinition: false,
          ClassDeclaration: false,
          FunctionExpression: false,
        },
      },
    ],
    semi: ['error', 'always'],
    'no-empty': 'error',
    'no-empty-function': 'error',
    'no-undef': 'error',
    'no-unused-vars': ['error', {vars: 'all', args: 'after-used'}],
    'no-dupe-keys': 'error',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
    },
  ],
};
