var config = require('../config'),
	browserSync = require('../util/browserSync'),
	gulpif = require('gulp-if'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.copyAssets.src)
			.pipe(gulp.dest(config.copyAssets.dest))
			.pipe(gulpif(!global.isProd, browserSync.stream()));
	});
};
