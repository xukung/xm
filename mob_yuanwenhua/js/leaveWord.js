$(document).ready(function () {
    "use strict";


    $('.leave-word .write').on('click', function () {
        $('.message-box .dx').html('文明上网,遵守7条底线');
        $('#overlay').show();
        $('#message').val('').focus();
    });

    $('.message-box .cancel').on('click', function () {
        $('#overlay').hide();
    });

    $('.message-box .send').on('click', function () {
        var sendUrl = '/receiveUrl';//接受数据的url
        var message = $('#message').val();
        // console.log($('#message').val());

        $.ajax({
            type: "GET",
            url: sendUrl,
            data: {text: message},
            success: function (json) {
                //留言成功
                $('#overlay').hide();
            },
            error: function (p_msg) {
                console.log(p_msg);
                $('.message-box .dx').html('评论失败,请重试!');
            }
        });

    })
});