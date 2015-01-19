var gulp           = require('gulp'),
    rimraf         = require('rimraf'),
    runSequence    = require('run-sequence'),
    frontMatter    = require('gulp-front-matter'),
    autoprefixer   = require('gulp-autoprefixer'),
    sass           = require('gulp-ruby-sass'),
    uglify         = require('gulp-uglify'),
    concat         = require('gulp-concat'),
    connect        = require('gulp-connect'),
    path           = require('path'),
    modRewrite     = require('connect-modrewrite'),
    dynamicRouting = require('./bower_components/foundation-apps/bin/gulp-dynamic-routing');

// Clean root file
gulp.task('clean', function(cb) {
	rimraf('./index.html', cb);
});

// Copy static files (but not the Angular templates, Sass, or JS)
gulp.task('copy', function() {
  var dirs = [
    './client/**/*.*',
    '!./client/templates/**/*.*',
    '!./client/assets/{scss,js}/**/*.*'
  ];

  gulp.src(dirs, {
    base: './client/'
  })
    .pipe(gulp.dest(''));

  return gulp.src('bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./assets/img/iconic/'));
});

gulp.task('clean-partials', function(cb) {
  rimraf('./partials', cb);
});

// Clean asset directory
gulp.task('clean-assets', function (cb) {
	rimraf('./assets', cb);
});

// Clean template directory
gulp.task('clean-templates', function (cb) {
	rimraf('./templates', cb);
});

gulp.task('copy-partials', ['clean-partials'], function() {
  return gulp.src(['bower_components/foundation-apps/js/angular/partials/**.*'])
    .pipe(gulp.dest('./partials/'));
});

gulp.task('sass', function() {
  return gulp.src('client/assets/scss/app.scss')
    .pipe(sass({
      loadPath: ['bower_components/foundation-apps/scss', 'client/assets/scss'],
      style: 'nested',
      bundleExec: true
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./assets/css/'));
});

// Process Foundation JS
gulp.task('uglify', ['uglify-angular'], function() {
  var libs = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'bower_components/notify.js/notify.js',
    'bower_components/tether/tether.js'
  ];

  return gulp.src(libs)
    .pipe(uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('./assets/js/'))
  ;
});

// Process Angular JS
gulp.task('uglify-angular', function() {
  var libs = [
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/ui-router/release/angular-ui-router.js',
    'bower_components/foundation-apps/js/vendor/**/*.js',
    'bower_components/foundation-apps/js/angular/**/*.js',
    'client/assets/js/*.js'
  ];

  return gulp.src(libs)
    .pipe(uglify({
      beautify: true,
      mangle: false
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./assets/js/'))
  ;

});

gulp.task('copy-templates', ['copy'], function() {
  var config = [];

  return gulp.src('./client/templates/**/*.html')
    .pipe(dynamicRouting({
      path: 'assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest('templates'))
  ;
});

gulp.task('server:start', function() {
  connect.server({
    root: './',
    middleware: function() {
      return [
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ];
    },
  });
});

gulp.task('build', function() {
	runSequence('clean', 'clean-assets', 'clean-partials', 'clean-templates', ['copy', 'copy-partials', 'sass', 'uglify'], 'copy-templates', function () {
    console.log("Successfully built.");
  })
});

gulp.task('default', ['build', 'server:start'], function() {
  // gulp.watch(['./client/**/*.*', './js/**/*.*'], ['build', 'css', server.restart]);

  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify']);

  // Watch static files
  gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

  // Watch Angular partials
  gulp.watch(['js/angular/partials/**.*'], ['copy-partials']);

  // Watch Angular templates
  gulp.watch(['./client/templates/**/*.html'], ['copy-templates']);
});
