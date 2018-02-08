var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var gcmq = require('gulp-group-css-media-queries');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');

var config = {
    src: './src/',
    css: {
        watch: 'sass/**/*.sass',
        src: 'sass/styles.sass',
        dest: 'css'
    },
    html: {
        src: '*.html'
    },
    js: {
      watch: 'js/main.js'
    }
};

gulp.task('pack', function(){
    gulp.src(config.src + config.css.dest + '/**/*.css')
        .pipe(autoprefixer({
            browsers: ['> 0.01%'],
            cascade: false
        }))
       .pipe(clean({
          level: 2
       }))
       .pipe(rename({suffix: '.min', prefix : ''}))
       .pipe(gulp.dest(config.src + config.css.dest));
       
});

gulp.task('build', function(){
   gulp.src(config.src + config.css.src)
       .pipe(sass().on('error', sass.logError))
       .pipe(gcmq())
       .pipe(gulp.dest(config.src + config.css.dest))
       .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync'], function(){
    gulp.watch(config.src + config.css.watch, ['build']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
    gulp.watch(config.src + config.js.watch, browserSync.reload);
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

//test