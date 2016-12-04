$(document).ready(function () {
    "use strict";

    //tag切换
    $('.tags > span').click(function(){
        var index=$('.tags > span').index(this);
        $(this).addClass('cur')
            .siblings('span').removeClass('cur');
        $('.cons > .each').eq(index).show()
            .siblings().hide();
    });

    //删除功能
    window.delConfirm = function (options) {
        var strConfirm = window.confirm('确定删除" ' + options.info + ' "么？');
        if (strConfirm) {
            window.location.href = options.redirect + "?id=" + options.id;
        }
    };

    //复选框全选功能
    $('input[type="checkbox"][id="check-all"]').click(function () {
        if($(this).get(0).checked){
            $('input.checktoggle').prop('checked',true);
        }else{
            $('input.checktoggle').prop('checked',false);
        }
    });

    //购买时长
    $('.shichang .all').click(function () {
        $(this).addClass('cur')
            .siblings().removeClass('cur');
    });

    //弹窗
    $('.popwin').click(function () {
        var dataTitle = $(this).attr('data-title');
        var dataInclude = $(this).attr('data-include');
        var options = {
            title: dataTitle,
            include: dataInclude
        };
        $(this).popWindow(options);
    });

    //日期选择
    if($.fn.datepicker){
        $('#datepicker1').datepicker({ dateFormat: 'yy-mm-dd' });
        $('#datepicker2').datepicker({ dateFormat: 'yy-mm-dd' });
        //date参数可以是数字（从今天算起，例如+7），或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')
        $('#select_yesterday').click(function () {
            $( "#datepicker1" ).datepicker( 'setDate' , '-1d');
            $( "#datepicker2" ).datepicker( 'setDate' , new Date());
        });
        $('#select_week').click(function () {
            $( "#datepicker1" ).datepicker( 'setDate' , '-1w');
            $( "#datepicker2" ).datepicker( 'setDate' , new Date());
        });
        $('#select_month').click(function () {
            $( "#datepicker1" ).datepicker( 'setDate' , '-1m');
            $( "#datepicker2" ).datepicker( 'setDate' , new Date());
        });
    }

    //申请开具发票-添加新信息
    $('#addNewFapiao').click(function  () {
        $('.tags > span').eq(0).trigger('click');
    });

    //二级菜单展开折叠控制
    $('ul.second-nav .fold').click(function  () {
        $(this).parent('li').toggleClass('cur');
    });
});