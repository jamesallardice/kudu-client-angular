module.exports = function ( config ) {

  config.set({
    browsers: [
      'PhantomJS',
    ],
    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../src/kudu-client-angular.es6',
      '../src/**/*.es6',
      './spec/**/*.es6',
    ],
    frameworks: [
      'mocha',
      'chai',
    ],
    preprocessors: {
      '../src/**/*.es6': [
        'babel',
      ],
      './**/*.es6': [
        'babel',
      ],
    },
    reporters: [
      'progress',
    ],
    singleRun: true,
  });
};
