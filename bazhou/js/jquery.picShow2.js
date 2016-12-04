(function ($) {
    var defaults = {
        step: 2000,
        width: 1000,
		height: 350
    };
	
    $.fn.picShow2 = function (options) {
        var options = $.extend(defaults, options);
		//此处this为jQuery对象
        return this.each(function () {
			//each中的this为DOM元素
			var XK=new ClassPicShow2($(this),options);
            XK.init();
        });
    };
	
	
	function ClassPicShow2(idObj,options){
		this._index=0; //当前索引
		this._zIndex=1;  //当前显示图片的z轴
		this._width=options.width;  //整体宽度
		this._height=options.height;  //整体高度
		this._picsUL=idObj.find('.slider'); //图片容器
		this._iconsUL=idObj.find('.sliderIcons');; //按钮容器
		this._timer=null;  //定时器
		this._step=options.step;  //轮播时间间隔，单位毫秒
	}
	
	ClassPicShow2.prototype={
		init:function(){
			var thisObj=this;  //解决嵌套函数this指向问题
			var num=this._picsUL.children().length;  //图片数量
			
			//重置宽度
			this._picsUL.parent().width(this._width); //.sliderContainer 
			this._picsUL.parent().parent().width(this._width); //.outWrap
			this._picsUL.find('img').width(this._width*7/10); //img
			this._picsUL.find('.description').width(this._width*7/10); //.description
			this._iconsUL.width(this._width*3/10);  //.sliderIcons
			this._iconsUL.children().width(this._width*3/20-10);  //.sliderIcons li
			//重置高度
			this._picsUL.parent().height(this._height); //.sliderContainer 
			this._picsUL.find('img').height(this._height); //.slider img
			this._iconsUL.children().height(this._height/4-10);  //.sliderIcons li
			this._iconsUL.find('img').height(this._height/4-10);  //.sliderIcons img
			
			//默认显示第一个
			this._iconsUL.children().first().addClass('cur'); 
			thisObj.picChange(0);
			
			//控制按钮增加鼠标行为
			this._iconsUL.children().each(function(){
				$(this).hover(function(){
					var index=$(this).index();
					thisObj.picChange(index);
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
		picChange:function(index){
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
		
		timeStart:function(){
			var thisObj=this;
			this._timer=setInterval(function(){
				if(thisObj._index < thisObj._picsUL.children().length-1){
					thisObj.picChange(thisObj._index+1);
				}else{
					thisObj.picChange(0);
				}
				
			},this._step);		
		},
		
		timeStop:function(){
			clearInterval(this._timer);
		}
	}
	
	
})(jQuery);