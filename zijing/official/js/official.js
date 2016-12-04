$(document).ready(function () {
    "use strict";

    //tag切换
    $('.tags > span').click(function () {
        var index = $('.tags > span').index(this);
        $(this).addClass('cur')
            .siblings('span').removeClass('cur');
        $('.cons > .each').eq(index).show()
            .siblings().hide();
    });

    //右下角icons显隐
    $(window).scroll(function () {
        var top=$(document).scrollTop();
        if(top > 300){
            $('.scroll-icons').css('display','block');
        }else{
            $('.scroll-icons').css('display','none');
        }
    });


    //一级导航菜单显隐
    $('ul.main-nav li').on('mouseenter', function () {
        $(this).find('.pop-menu').show();
    }).on('mouseleave', function () {
        $(this).find('.pop-menu').hide();
    });


    //二级导航菜单折叠
    $('ul.subnav .master').on('click', function (event) {
        $('.slave').hide();
        $(this).next('.slave').toggle();
    });


});