$(document).ready(function () {
    function loadMoreComment(num) {
        $.ajax({
            type: 'GET',
            url: './data2.json',
            data: {offset: num, size: 5},
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
            fragment += '<li class="clearfix">' +
                '<div class="col-avatar">' +
                '<img src="images/halftransparent.png" alt="">' +
                '</div>' +
                '<div class="col-r">' +
                '<div class="cyan">' + value.user + '</div>' +
                '<div class="talk">' + value.comment + '</div>' +
                '<div class="clearfix">' +
                '<div class="fleft"><a href="#" class="cyan">回复</a></div>' +
                '<div class="fright">' +
                '<span class="ding">' + value.ding + '</span>' +
                '</div></div></div>' +
                '</li>';
        });
        $('ul.comment').append(fragment);
    }

    $('#loadMoreComment').on('click', function () {
        var len = $('ul.comment li').length;
        loadMoreComment(len);
    });
});