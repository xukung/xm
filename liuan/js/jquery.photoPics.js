(function ($) {
    var defaults = {
        dis: 920
    };
	
    $.fn.photoPics = function (options) {
        var options = $.extend(defaults, options);
		//此处this为jQuery对象
        return this.each(function () {
			//each中的this为DOM元素
			var XK=new ClassPhotoPics($(this),options);
            XK.init();
        });
    };
	
	
	function ClassPhotoPics(idObj,options){
		this._dis=options.dis; //每次滚动的距离
		this._sLeft=idObj.find('.sLeftPhoto');
		this._sRight=idObj.find('.sRightPhoto');
		this._pics=idObj.find('.photoPics');
	}
	
	ClassPhotoPics.prototype={
		init:function(){
			var thisObj=this;  //解决嵌套函数this指向问题
			
			this._sLeft.click(function(){
				var curleft=thisObj._pics.scrollLeft();
				curleft-=thisObj._dis;
				thisObj._pics.animate({scrollLeft:curleft}, "slow");
			});
			this._sRight.click(function(){
				var curleft=thisObj._pics.scrollLeft();
				curleft+=thisObj._dis;
				thisObj._pics.animate({scrollLeft:curleft}, "slow");
			});
		}
		
	}
})(jQuery);