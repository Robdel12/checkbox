module.exports = function(config) {
  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // files to watch
    files: [
      'tests/*-test.js'
    ],

    // processors per file
    preprocessors: {
      'tests/*-test.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // define browsers
    customLaunchers: {
      Chrome_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // webpack configuration
    webpack: require('./webpack.config.js'),

    // webpack-dev-middleware config
    webpackMiddleware: {
      stats: 'errors-only'
    },

    // enable our plugins
    plugins: [
      require('karma-mocha'),
      require('karma-webpack'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher')
    ]
  });

  // CI config
  if (process.env.TRAVIS || process.env.CI) {
    config.singleRun = true;
    config.browsers = ['Chrome_ci'];
  }
};
