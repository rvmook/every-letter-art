var	styles = {
		src: 'src/assets/styles/**/*.scss',
		dest: 'dist/assets/styles'
	},
	browserify = {
		entries: ['./src/assets/scripts/main.js'],
		bundleName: 'main.js',
		dest: 'dist/assets/scripts',
		sourcemap: true
	},
	esLintFiles = ['./gulp/**/*.js', './src/assets/scripts/**/*.js', '!./src/assets/scripts/libs/**/*.js'],
	uglify = {
		preserveComments: 'some',
		compress: {
			drop_console: true //eslint-disable-line camelcase
		}
	},
	html = {
		src: ['./src/**/*.html'],
		dest: './dist',
		options: {
			removeOptionalTags:true,
			removeEmptyAttributes:true,
			removeScriptTypeAttributes:true,
			removeStyleLinkTypeAttributes:true,
			useShortDoctype:true,
			removeRedundantAttributes:true,
			removeAttributeQuotes:true,
			removeComments:true,
			minifyCSS:true,
			collapseWhitespace:true,
			maxLineLength:120
		}
	},
	copyStaticAssets = {
		src:[
			'src/assets/**',
			'!src/assets/scripts/**',
			'!src/assets/styles/**'
		],
		dest:'dist/assets/'
	},
	copyScripts = {
		src: [
			'src/assets/scripts/libs/**.js'
		],
		dest: './dist/assets/scripts/libs'
	},
	clean = ['dist/**'];

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.esLintFiles = esLintFiles;
exports.copyScripts = copyScripts;
exports.copyStaticAssets = copyStaticAssets;
exports.browserify = browserify;
exports.uglify = uglify;