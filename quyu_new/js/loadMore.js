$(document).ready(function () {
    "use strict";

    function loadMore(num) {
        $.ajax({
            type: 'GET',
            url: './data.json',
            data: {offset: num, size: 4},
            dataType: 'json',
            success: function (msg) {
                appendDOM(msg);
            },
            error: function (msg) {
                console.error(msg);
            }
        })
    }

    function appendDOM(json) {
        var fragment = '';

        json.map(function (value, index) {

            switch (value.type) {
                case 'noImage':
                    fragment += '<li class="clearfix">'
                        + '<h1><a href=' + value.link + '>' + value.title + '</a></h1>'
                        + '<div class="sub">'
                        + '<span class="source">' + value.source + '</span>'
                        + '<span class="time">' + value.time + '</span>'
                        + '<span class="hit">' + value.hit + '</span>'
                        + '</div>'
                        + '</li>';
                    break;

                case 'smallImage':
                    fragment += '<li class="clearfix">'
                        + '<div class="col-left">'
                        + '<h1><a href=' + value.link + '>' + value.title + '</a></h1>'
                        + '<div class="sub">'
                        + '<span class="source">' + value.source + '</span>'
                        + '<span class="time">' + value.time + '</span>'
                        + '<span class="hit">' + value.hit + '</span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-right">'
                        + '<div class="pic">'
                        + '<a href=' + value.link + '><img src=' + value.images[0] + '></a>'
                        + '<span class="num">' + value.num + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</li>';
                    break;

                case 'bigImage':
                    fragment += '<li class="clearfix">'
                        + '<h1><a href=' + value.link + '>' + value.title + '</a></h1>'
                        + '<div class="big-pic">'
                        + '<a href=' + value.link + '><img src=' + value.images[0] + '></a>'
                        + '<span class="num">' + value.num + '</span>'
                        + '</div>'
                        + '<div class="sub">'
                        + '<span class="source">' + value.source + '</span>'
                        + '<span class="time">' + value.time + '</span>'
                        + '<span class="hit">' + value.hit + '</span>'
                        + '</div>'
                        + '</li>';
                    break;


                case 'threeImage':
                    fragment += '<li class="clearfix">'
                        + '<h1><a href=' + value.link + '>' + value.title + '</a></h1>'
                        + '<div class="pics clearfix">'
                        + '<a href=' + value.link + '><img src=' + value.images[0] + '></a>'
                        + '<a href=' + value.link + '><img src=' + value.images[1] + '></a>'
                        + '<a href=' + value.link + '><img src=' + value.images[2] + '></a>'
                        + '</div>'
                        + '<div class="sub">'
                        + '<span class="source">' + value.source + '</span>'
                        + '<span class="time">' + value.time + '</span>'
                        + '<span class="hit">' + value.hit + '</span>'
                        + '</div>'
                        + '</li>';
                    break;

            }
        });

        $('ul.list').append(fragment);
    }

    window.addEventListener('scroll', function () {
        var b;
        if (document.body.scrollTop) {
            b = document.body;
        } else {
            b = document.documentElement;
        }
        var scrollHeight = b.scrollHeight;
        var clientHeight = b.clientHeight;
        var scrollTop = b.scrollTop;
        var len = $('ul.list li').length;

        // console.info(scrollHeight, clientHeight, scrollTop);

        if (scrollHeight < clientHeight + scrollTop + 3) {
            loadMore(len);
        }
    });
});