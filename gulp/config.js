var	styles = {
		src: 'src/assets/styles/**/*.scss',
		dest: 'dist/assets/styles'
	},
	browserify = {
		entries: ['./src/assets/scripts/main.js'],
		bundleName: 'main.js',
		dest: 'dist/assets/scripts'
	},
	handlebars = {
		dataRequire:'../../src/data.json',
		partials:['./src/handlebars/partials'],
		src:['src/handlebars/*.hbs', 'src/handlebars/**/*.hbs', '!src/handlebars/partials/*.hbs', '!src/handlebars/art/*.hbs'],
		artSrc:['src/handlebars/art/index.hbs', 'src/handlebars/art/info.hbs'],
		dist:'dist',
		watch:['src/handlebars/*.hbs', 'src/handlebars/*/**.hbs', 'src/data.json'],
		rename:function(path) {
			path.extname = '.html';
		},
		minifyHTML: {
			removeComments:true,
			removeTagWhitespace:true,
			collapseWhitespace:true,
			removeOptionalTags:true,
			minifyJS:true
		}
	},
	uglify = {
		preserveComments: 'some',
		compress: {
			drop_console: true
		}
	},
	copyAssets = {
		src:[
			'src/assets/**',
			'!src/assets/scripts/**',
			'!src/assets/styles/**'
		],
		dest:'dist/assets/'
	},
	clean = ['dist/**'];

exports.clean = clean;
exports.handlebars = handlebars;
exports.styles = styles;
exports.copyAssets = copyAssets;
exports.browserify = browserify;
exports.uglify = uglify;