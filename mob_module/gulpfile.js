var gulp=require('gulp');
var spriter = require('gulp-css-spriter');

gulp.task('sprite', function() {
    return gulp.src('./css/sprite.css')
        .pipe(spriter({
            'spriteSheet': './images/sprite.png', //这是雪碧图自动合成的图
            'pathToSpriteSheetFromCSS': '../../images/sprite.png' //css引用的图片路径
        }))
        .pipe(gulp.dest('./css/dist'));
});

gulp.task('default',['sprite']);