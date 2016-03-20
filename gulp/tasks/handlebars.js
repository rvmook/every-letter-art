var config = require('../config'),
	browserSync = require('../util/browserSync'),
	handleErrors = require('../util/handleErrors'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	handlebars = require('gulp-compile-handlebars'),
	minifyHTML = require('gulp-htmlmin'),
	rename = require('gulp-rename');

module.exports = function(taskName) {

	var templateData = require(config.handlebars.dataRequire),
		artTasks = [],
		artTaskName;

	for(var key in templateData.art) {

		if(templateData.art.hasOwnProperty(key)) {

			artTaskName = 'art-' + key;

			artTasks.push(artTaskName);

			gulp.task(artTaskName, createArtTask(key));
		}
	}

	function createArtTask(id) {

		return function() {


			// deleting the require cache to make sure we get the latest json if it's updated
			delete require.cache[require.resolve(config.handlebars.dataRequire)];

			var templateData = require(config.handlebars.dataRequire).art[id];

			if(!templateData) {

				// Log the error and stop the process
				// to prevent broken code from building
				console.log('Please rerun `gulp` when updating one of the art id\'s.');
				process.exit(1);
				return;
			}

			templateData.isProd = global.isProd;

			return handlebarsSequence(
				config.handlebars.artSrc,
				templateData,
				function(path){

					var basename = id + '/';

					if(path.basename !== 'index') {

						basename += path.basename + '/';
					}

					basename += 'index';

					path.basename = basename;
					path.extname = '.html';
				}
			);
		}
	}

	gulp.task(taskName, artTasks, function(){

		// deleting the require cache to make sure we get the latest json if it's updated
		delete require.cache[require.resolve(config.handlebars.dataRequire)];

		var templateData = require(config.handlebars.dataRequire),
			options = {
				batch : config.handlebars.partials
			};

		templateData.isProd = global.isProd;

		return handlebarsSequence(
			config.handlebars.src,
			templateData,
			config.handlebars.rename
		);
	});
};

function handlebarsSequence(src, templateData, renamer) {

	var options = {
		batch : config.handlebars.partials
	};

	return gulp.src(src)
		.pipe(handlebars(templateData, options))
		.on('error', handleErrors)
		.pipe(rename(renamer))
		.pipe(gulpif(global.isProd, minifyHTML(config.handlebars.minifyHTML)))
		.pipe(gulp.dest(config.handlebars.dist))
		.pipe(gulpif(!global.isProd, browserSync.stream()));
}


