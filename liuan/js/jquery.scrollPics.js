(function ($) {
    var defaults = {
		pics: 'idScrollPics',
		step: 20,
		picWidth: 120,
		distance: 10,
		scrollWidth: 900,
		scrollHeight: 50
    };
	
    $.fn.scrollShow = function (options) {
        var options = $.extend(defaults, options);
        return this.each(function () {
            XK.initialize(options);
        });
    };
	
    var XK = {
		initialize:function(options){
			
			this._picWidth=options.picWidth;  //图片宽度
			this._distance=options.distance;  //图片间距
			this._width=options.scrollWidth;  //滚动区域宽度
			this._height=options.scrollHeight;  //滚动区域高度
			this._pics=$('#'+options.pics); //滚动容器
			this._timer=null;  //定时器
			this._step=options.step;  //轮播时间间隔，单位毫秒
			
			var thisObj=this;  //解决嵌套函数this指向问题
			var num=this._pics.children().length;  //图片数量
			var html=this._pics.html();
			this._pics.append(html); //复制并增加已有图片
			
			//计算单元宽度
			var eachWidth=this._picWidth+this._distance;
			//重置宽度
			this._pics.width(eachWidth*num*2);
			this._pics.parent().width(this._width);
			this._pics.children().width(eachWidth);
			this._pics.children().find('img').width(this._picWidth);
			//重置高度
			this._pics.parent().height(this._height);
			this._pics.children().find('img').height(this._height);
						
			//控制按钮增加鼠标行为
			this._pics.hover(function(){
				thisObj.timeStop();
			},function(){
				thisObj.timeStart();
			});
			
			//开始自动轮播
			this.timeStart(); 
		},
		
		//滚动
		toScroll:function(){
			var curleftStr=this._pics.css("left");
			if(curleftStr){
				var length=curleftStr.length;
				var curleft=parseInt(curleftStr.substr(0,length-2));
				var linjie=this._pics.width()/2;
				if(curleft <= -linjie){
					curleft=0;
				}else{
					curleft-=1;
				}
				this._pics.css('left',curleft+'px');
			}
		},
				
		//定时轮播
		timeStart:function(){
			var thisObj=this;
			this._timer=setInterval(function(){thisObj.toScroll();},this._step);
		},
		
		//停止轮播
		timeStop:function(){
			clearInterval(this._timer);
		}    
	};

})(jQuery);