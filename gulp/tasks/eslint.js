// NPM depenedencies
var gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	gulpif = require('gulp-if'),

	// Project dependencies
	config = require('../config');


module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.esLintFiles)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(gulpif(global.isProd, eslint.failAfterError()))
	});
};

