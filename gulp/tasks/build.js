var gulp = require('gulp'),
	browserSync = require('../util/browserSync'),
	runSequence = require('run-sequence');

module.exports = function(taskName) {

	gulp.task(taskName, ['clean'], function (cb) {

		cb = cb || function () {};

		var args = ['styles', 'html', 'browserify', 'copyStaticAssets', 'copyScripts'];

		if (!global.isProd) {

			browserSync.init({
				server: {
					baseDir: './dist'
				}
			});
			args.push('watch');
		}

		args.push('eslint', cb);

		return runSequence.apply(this, args);
	});
};