(function ($) {
    var defaults = {
        picsUL: 'idSlider4',
        iconsUL: 'idSliderIcons4',
        step: 2000,
        picWidth: 550,
		picHeight: 320
    };
	
    $.fn.picShow4 = function (options) {
        var options = $.extend(defaults, options);
        return this.each(function () {
            XK.initialize(options);
        });
    };
	
    var XK = {
		//初始化对象
		initialize:function(options){
			
			this._index=0; //当前索引
			this._zIndex=1;  //当前显示图片的z轴
			this._picWidth=options.picWidth;  //每张图片的宽度
			this._picHeight=options.picHeight;  //每张图片的高度
			this._picsUL=$('#'+options.picsUL); //图片容器
			this._iconsUL=$('#'+options.iconsUL); //按钮容器
			this._timer=null;  //定时器
			this._step=options.step;  //轮播时间间隔，单位毫秒
			
			var thisObj=this;  //解决嵌套函数this指向问题
			var num=this._picsUL.children().length;  //图片数量
			
			//重置宽度
			this._picsUL.parent().width(this._picWidth); //.sliderContainer 
			this._picsUL.parent().parent().width(this._picWidth); //.outWrap
			this._picsUL.find('img').width(this._picWidth); //img
			this._picsUL.find('.description').width(this._picWidth); //.description
			this._iconsUL.children().width(this._picWidth/num-6);  //.sliderIcons li
			//重置高度
			this._picsUL.parent().height(this._picHeight); //.sliderContainer 
			this._picsUL.find('img').height(this._picHeight); //img
			
			//默认显示第一个
			this._iconsUL.children().first().addClass('cur'); 
			thisObj.change(0);
			
			//控制按钮增加鼠标行为
			this._iconsUL.children().each(function(){
				$(this).hover(function(){
					var index=$(this).index();
					thisObj.change(index);
					thisObj.timeStop();
				},function(){
					thisObj.timeStart();
				});
			});
			this._picsUL.hover(function(){
				thisObj.timeStop();
			},function(){
				thisObj.timeStart();
			});
			
			//开始自动轮播
			this.timeStart(); 
		},
		
		//进行图片和按钮切换
		change:function(index){
			//切换图片
			var thisObj=this;
			var zIndex=this._zIndex+1;
			var target=this._picsUL.children().eq(index);
			
			target.css({"z-index":zIndex});
			target.hide();
			target.fadeIn('fast','swing',function(){thisObj._index=index;thisObj._zIndex+=1;});
			
			//切换按钮
			var curIcon=this._iconsUL.children().eq(index);
			curIcon.addClass('cur').siblings().removeClass('cur');
		},
		
		//定时轮播
		timeStart:function(){
			var thisObj=this;
			this._timer=setInterval(function(){
				if(thisObj._index < thisObj._picsUL.children().length-1){
					thisObj.change(thisObj._index+1);
				}else{
					thisObj.change(0);
				}
				
			},this._step);
		},
		
		//停止轮播
		timeStop:function(){
			clearInterval(this._timer);
		}
	

	};

})(jQuery);














var PicShow={

};