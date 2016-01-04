'use strict';

const del = require('del');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');

plugins.webpack = require('webpack-stream');

const tsProject = plugins.typescript.createProject('tsconfig.json', {
  module: 'commonjs',
  typescript: require('typescript'),
});

const paths = {
  common: {
    react: './common/**/*.{ts,tsx}',
    entry: './common/index.ts',
  },
  server: {
    common: './server/common',
  },
  mainCss: './public/css/main.css',
  public: './public',
  scss: './scss/**/*.scss',
};

gulp.task('clean', done => {
  del([paths.public, paths.server.common])
    .then(paths => done());
});

gulp.task('webpack-dev-server', () =>
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
  }).listen(8080, 'localhost', function(err) {
    if (err) {
      throw new plugins.util.PluginError('webpack-dev-server', err);
    }
  }));

gulp.task('compile', ['clean'], () =>
  tsProject.src()
    .pipe(plugins.typescript(tsProject))
    .pipe(plugins.babel({
      presets: 'es2015',
      plugins: ['transform-runtime'],
    }))
    .pipe(gulp.dest('./server')));

gulp.task('recompile', () =>
  tsProject.src()
    .pipe(plugins.typescript(tsProject))
    .pipe(plugins.babel({
      presets: 'es2015',
      plugins: ['transform-runtime'],
    }))
    .pipe(gulp.dest('./server')));

gulp.task('scss', () =>
  gulp.src(paths.scss)
    .pipe(plugins.sass().on('error', plugins.util.log))
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest('./public/css')));

gulp.task('build-scss', ['clean'], () =>
  gulp.src(paths.scss)
    .pipe(plugins.sass().on('error', plugins.util.log))
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./public/css')));

gulp.task('webpack', ['clean'], () =>
  gulp.src(paths.common.entry)
    .pipe(plugins.webpack(webpackConfig)
      .on('error', plugins.util.log))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./public/js')));

gulp.task('watch', ['scss', 'recompile', 'webpack-dev-server'], () => {
  gulp.watch(paths.scss, ['scss']);
  gulp.watch(paths.common.react, ['recompile']);
});

gulp.task('build', ['build-scss', 'webpack', 'compile']);

gulp.task('default', ['watch']);
