$(document).ready(function(){
	"use strict";

	//tag切换
	$('.tags > a').mouseover(function(){
		var index=$('.tags > a').index(this);
		$(this).addClass('cur')
			.siblings('a').removeClass('cur');
		$('.cons > .each').eq(index).show()
			.siblings().hide();
	})




});