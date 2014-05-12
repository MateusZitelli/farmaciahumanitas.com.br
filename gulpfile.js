var gulp = require('gulp');
	path = require('path'),
  compass = require('gulp-compass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  jekyll = require('gulp-jekyll');

gulp.task('compass',function(){
	gulp.src('./assets/sass/*.scss')
		.pipe(compass({
			project: path.join(__dirname, 'assets'),
			css:'css',
			sass:'sass',
		}))
		.pipe(minifycss())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/styles'))
		.pipe(livereload());
});

gulp.task('scripts', function(){
	return gulp.src('./assets/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(livereload());
});

gulp.task('js_libs', function(){
	return gulp.src('./assets/js/libs/*.js')
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(livereload());
});

gulp.task('images',function(){
	return gulp.src('assets/img/**/*.[jpg,png]')
		//.pipe(cache(imagemin({optimizationLevel:3, progressive: true, interlaced:true})))
		.pipe(gulp.dest('dist/images/'))
		.pipe(livereload());
});

gulp.task('clean', function(){
	return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read:false})
		.pipe(clean());
});

gulp.task('jekyll', function(){
	require('child_process').spawn('jekyll', ['build'], {stdio: 'inherit'});
});

gulp.task('default', ['compass', 'scripts', 'js_libs', 'images', 'jekyll'], function(){
	gulp.watch('assets/sass/**/*.scss', ['compass', 'jekyll']);
	gulp.watch('assets/js/*.js', ['scripts', 'jekyll']);
	gulp.watch('assets/js/libs/*.js', ['js_libs', 'jekyll']);
	gulp.watch('assets/img/**/*', ['images', 'jekyll']);
	gulp.watch(['ajax/*.html', 'blog/*.html', './*.md', '_posts/*.md', '_layouts/*.html', '_includes/*.html'], ['jekyll']);
});
