$(function(){
    addShourtCutsIphone();
    $("#short_x").click(function(){
        $("#short_wrap").hide();
    });
    $("#wx_bar_close").on("click",function(){
        $(".wx_short_bar").remove();
    });
    setInterval('$("#short_wrap").hide()',15000);


    $("#bar_close").on("click",function(){
        $(".short_bar").remove();
    });
});

function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

//主屏幕 快捷方式
function addShourtCutsIphone(){
    var isIDevice = (/iphone|ipad/gi).test(navigator.appVersion); // IOS手机
    if (isIDevice) {
        if(is_weixn()){
            $(".wx_short_bar").show();
            return;
        }
        var safari = null;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/version\/([\d.]+)/) != null) {
            window.openDatabase ? safari = ua.match(/version\/([\d.]+)/)[1] : 0;
            if (safari != 0) {
                $("#short_wrap").show();
            }
        }
    }else{
        //apkDownload($('.short_bar'));
        return;
    }
}