$(document).ready(function () {

    //将图片的高度设置为宽度的一半
    var swiper_width=$('.swiper-container').width();
    var swiper_height=swiper_width/2;
    $('#sw1 .swiper-slide img').height(swiper_height);
    //api参考 http://www.swiper.com.cn/api/index.html

    var mySwiper = new Swiper ('#sw1', {
        loop: true,
        autoplay:3000
    });

    var mySwiper2 = new Swiper ('#sw2', {
        loop: true,
        pagination: '#page2'
    });

    var mySwiper3 = new Swiper ('#sw3', {
        loop: true,
        pagination: '#page3'
    });

});