$(document).ready(function () {
    "use strict";

    //加载ajax数据的url地址
    var dataUrl = './data10.json';

    //加载目标
    var target = $('#dataTarget');

    $('#btnLoadMore').on('click', loadMore);

    function loadMore() {
        //numOffset 为请求数据卷滚的条数，即已经加载的条数
        var numOffset = target.find('li').length;
        $('#btnLoadMore').html('正在加载...');

        $.ajax({
            type: "GET",
            url: dataUrl,
            data: {offset: numOffset},
            success: function (json) {
                // console.log(typeof json);
                $('#btnLoadMore').html('查看更多评论');
                var lis = '';
                //进行DOM拼接
                for (var i = 0; i < json.length; i++) {
                    var li = '<li class="clearfix">' +
                        '<div class="avatar"><img src=' + json[i].imgurl + '></div>' +
                        '<div class="name">' + json[i].name + '</div>' +
                        '<div class="sub">' + json[i].address + ' ' + json[i].time + '</div>' +
                        '<div class="hot">' + json[i].hot + '顶</div>' +
                        '<div class="words">' + json[i].words + '</div>' +
                        '</li>';
                    lis += li;
                }
                target.append(lis);
            },
            error: function (p_msg) {
                $('#btnLoadMore').html('加载失败,请重试');
                console.log(p_msg);
            }
        });

    }

});