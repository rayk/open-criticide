module.exports = function(wallaby) {
  return {
    files: [
      'src/**',
      'test/stubs/**',
      {
        pattern: 'node_modules/react/dist/react-with-addons.js',
        instrument: false,
      },
    ],
    tests: ['test/unit/**/*.test.js'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel(),
    },
    debug: true,
  };
};
