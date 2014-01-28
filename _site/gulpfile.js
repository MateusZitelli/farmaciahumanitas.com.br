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
    lr = require('tiny-lr'),
    jekyll = require('gulp-jekyll'),
    server = lr();

gulp.task('compass',function(){
	gulp.src('./assets/sass/*.scss')
		.pipe(compass({
			project: path.join(__dirname, 'assets'),
			css:'css',
			sass:'sass',
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(livereload(server))
		.pipe(gulp.dest('dist/styles'))
		.pipe(livereload(server));
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
		.pipe(livereload(server))
});

gulp.task('js_libs', function(){
	return gulp.src('./assets/js/libs/*.js')
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(livereload(server))
});

gulp.task('images',function(){
	return gulp.src('assets/img/**/*.[jpg,png]')
		//.pipe(cache(imagemin({optimizationLevel:3, progressive: true, interlaced:true})))
		.pipe(livereload(server))
		.pipe(gulp.dest('dist/images/'))
});

gulp.task('clean', function(){
	return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read:false})
		.pipe(clean());
});

gulp.task('jekyll', function(){
	return gulp.src('./_site/*.html')
		.pipe(livereload(server))
})

gulp.task('watch', function(){
	//Listen on port 35729
	server.listen(35729, function(err){
		if(err){
			return console.log(err);
		};

		gulp.watch('assets/sass/**/*.scss', function(event){
			console.log('File '+ event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('compass');
		});

		gulp.watch('assets/js/*.js', function(event){
			console.log('File '+ event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('scripts');
		});

		gulp.watch('assets/js/libs/*.js', function(event){
			console.log('File '+ event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('js_libs');
		});

		gulp.watch('assets/img/**/*', function(event){
			console.log('File '+ event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('images');
		});

		gulp.watch(['./*.md', './_layout/*.html', '_includes/*.html', '_post/*.md', 'ajax/*.html'], function(event){
			console.log('File '+ event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('jekyll');
		})
	});
});

gulp.task('default', function(){
	gulp.run('compass');
	gulp.run('scripts');
	gulp.run('js_libs');
	gulp.run('images');
	//gulp.run('jekyll');
});