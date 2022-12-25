const { series, parallel, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const minifyjs = require('gulp-js-minify');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

function compileStyles() {
	return src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(dest('src/css'));
}

function buildStyles() {
	return src('src/css/*.css')
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(concat('scripts.min.css'))
		.pipe(cleanCSS())
		.pipe(dest('dist'));
}

function buildJS() {
	return src('src/js/*.js')
		.pipe(concat('scripts.min.js'))
		.pipe(minifyjs())
		.pipe(uglify())
		.pipe(dest('./dist/'));
}

function minifyImg() {
	return src('src/img/**/*')
		.pipe(imagemin())
		.pipe(dest('dist/img'));
}

function cleanDist() {
	return src('dist/*')
		.pipe(clean());
}

function serve() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	watch('src/scss/**/*.scss', compileStyles);
	watch('src/scss/*.scss', compileStyles);
	watch('src/js/*.js', buildJS);
	watch('./*.html').on('change', browserSync.reload);
	watch('src/css/*.css').on('change', browserSync.reload);
	watch('src/js/*.js').on('change', browserSync.reload);
}

const build = series(cleanDist, parallel(buildStyles, buildJS, minifyImg));

exports.buildStyles = buildStyles;
exports.compileStyles = compileStyles;
exports.watch = function() {
	watch('src/scss/**/*.scss', [compileStyles]);
};
exports.buildJS = buildJS;
exports.minifyImg = minifyImg;
exports.cleanDist = cleanDist;
exports.build = build;

exports.default = serve;

