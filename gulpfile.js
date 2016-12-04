var gulp=require('gulp');
var spriter = require('gulp-css-spriter');

//区域新首页图标合成雪碧图
gulp.task('sprite', function() {
    return gulp.src('./quyu_new/css/sprite.css')
        .pipe(spriter({
            'spriteSheet': './quyu_new/images/sprite.png', //这是雪碧图自动合成的图
            'pathToSpriteSheetFromCSS': '../../images/sprite.png' //css引用的图片路径
        }))
        .pipe(gulp.dest('./quyu_new/css/dist'));
});


gulp.task('default',['sprite']);