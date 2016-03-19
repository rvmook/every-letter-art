var config = require('../config'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	gutil = require('gulp-util'),
	source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
	buffer = require('vinyl-buffer'),
	streamify = require('gulp-streamify'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	browserSync = require('../util/browserSync'),
	handleErrors = require('../util/handleErrors');


function buildScript(file) {

	var bundler = browserify({
		entries: config.browserify.entries,
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: false
	}, watchify.args);

	if ( !global.isProd ) {
		bundler = watchify(bundler);
		bundler.on('update', function() {
			rebundle();
		});
	}

	var transforms = [
		'brfs'
	];

	transforms.forEach(function(transform) {
		bundler.transform(transform);
	});

	function rebundle() {
		var stream = bundler.bundle();
		var createSourcemap = !global.isProd && config.browserify.sourcemap;

		gutil.log('Rebundle Browserify' + config.browserify.dest);

		return stream.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulpif(createSourcemap, buffer()))
			.pipe(gulpif(createSourcemap, sourcemaps.init()))
			.pipe(gulpif(global.isProd, streamify(uglify(config.uglify))))
			.pipe(gulpif(createSourcemap, sourcemaps.write('./')))
			.pipe(gulp.dest(config.browserify.dest))
			.pipe(gulpif(!global.isProd, browserSync.stream()))
	}

	return rebundle();

}

module.exports = function(taskName) {

	gulp.task(taskName, function() {

		return buildScript(config.browserify.bundleName);

	});
}