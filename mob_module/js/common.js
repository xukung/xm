$(document).ready(function () {
    "use strict";

    //控制导航菜单的折叠和显隐
    $('.nav-btn').on('click', function () {
        $('.nav-bar').toggleClass('show-all-nav');
    });

    //控制右上角菜单项
    $('header .right-region .icon-bars').on('click', function () {
        $('.menu').toggle();
    });
});