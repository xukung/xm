(function ($) {
    $.ajaxSetup ({
        cache: false //关闭ajax缓存
    });

    var defaults = {
        title: '默认标题',
        include:'inc1.html'
    };

    $.fn.popWindow = function (options) {
        var _option = $.extend(defaults, options);
        //此处this为jQuery对象
        return this.each(function () {
            //each中的this为DOM元素
            handle(_option);
        });
    };

    function handle(options){
        var popDom = '<div class="popOverlay"><div class="popBox">' +
            '<div class="tit">' + options.title + '</div>' +
            '<div class="con"></div>' +
            '</div></div>';

        $(popDom).hide().appendTo('body').fadeIn('fast');

        $('.popBox .con').load(options.include,function(){
            $('.closePopWin').click(function () {
                $('.popOverlay').remove();
            });
        });



    }

})(jQuery);