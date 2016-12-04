$(document).ready(function () {
    "use strict";

    var distance = 300;    // 当滚动到最底部以上300像素时， 加载新内容
    var debounced = _.debounce(loadMore, 3000, true);     //延迟触发

    $(window).scroll(function () {
        if ($(document).height() - $(window).scrollTop() - $(window).height() < distance) {
            debounced();
        }
    });

    $('#btnLoadMore').on('click', loadMore);

    function loadMore() {
        var numOffset = $('ul.fynews li').length;
        $('#ajaxTips').html('正在加载...').show();

        $.ajax({
            type: "GET",
            //url: 'query_more.php',
            url: 'json/loadMore_fynews.json',
            dataType:"text",
            data: {offset: numOffset},
            success: function (p_jsonStr) {
                //console.log(p_jsonStr);
                $('#ajaxTips').html('加载成功').fadeOut('slow');

                var jsonObj = JSON.parse(p_jsonStr);
                var lis = '';
                for (var i = 0; i < jsonObj.length; i++) {
                    var li =    '<li class="clearfix">' +
                                '<div class="pic"><a href='+jsonObj[i].link+'><img src='+jsonObj[i].pic+'></a></div>' +
                                '<div class="txt">'+
                                '<div class="tt omit"><a href='+jsonObj[i].link+'>'+jsonObj[i].title+'</a></div>'+
                                '<div class="gray">'+jsonObj[i].from+'</div>'+
                                '</div>';
                    lis += li;
                }
                $('ul.fynews').append(lis);

                //重置缩略图高度
                //$('img.thumbpic').each(function () {
                //    var thumbwidth = $(this).width();
                //    $(this).css({height: thumbwidth * 3 / 4});
                //});
            },
            error: function (p_msg) {
                $('#ajaxTips').html('加载失败');
                console.log(p_msg);
            }
        });

    }
});