(function ($) {
    "use strict";

    var defaults = {
        src: 'http://db.gxtv.cn/a7240d497ce0c80701c57f1868744fb4/nn_vod.mp4',
        width: 640,
        height: 554
    };
    $.fn.videoPlay = function (options) {
        var options = $.extend(defaults, options);
        //此处this为jQuery对象
        return this.each(function () {
            var containerWidth=$(this).width();
            var containerHeight=parseInt(containerWidth*(options.height/options.width));
            var videoStr='<video width="100%" controls="controls" height="'+containerHeight+'">'+
                    '<source type="video/mp4" src="'+options.src+'">'+
                    '您的浏览器不支持video标签，请升级浏览器'+
                    '</video>';
            $(this).html(videoStr);
        });
    };
})(jQuery);