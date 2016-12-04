$(document).ready(function () {
    "use strict";

    //滑动导航控制
    (function () {
        var slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 180,
            'tolerance': 70
        });
        document.querySelector('.toggle-button').addEventListener('click', function (evt) {
            slideout.toggle();
            evt.stopPropagation();
        });
        document.querySelector('#panel').addEventListener('click', function () {
            if (slideout.isOpen()) {
                slideout.close();
            }
        });
    })();

    //焦点图
    (function () {
        var focusHeight = $('.focus .swiper-container').width() / 3;
        $('.focus .swiper-container').height(focusHeight);
        $('.focus .swiper-container img').height(focusHeight);
        var focusSwiper = new Swiper('.focus .swiper-container', {
            //autoplay: 3000,
            loop: true,
            pagination: '.swiper-pagination'
        });
    })();

    //tag切换
    $('.tags > a').mouseover(function(){
        var index=$('.tags > a').index(this);
        $(this).addClass('cur')
            .siblings('a').removeClass('cur');
        $('.cons > .each').eq(index).show()
            .siblings().hide();
    })


});


