$(document).ready(function() {
	var timer_zhuchiren=setInterval(gundong,50);
	var step=1;
	function gundong(){
		
		//此处数值根据实际需求，10副图为190*10-1070=830
		if($('.photoPics').scrollLeft() === 830){
			step=-1;
		}else if($('.photoPics').scrollLeft() === 0){
			step=1;
		}
		$('.photoPics').scrollLeft($('.photoPics').scrollLeft()+step);
	}
	$('.photoPics,.sLeftPhoto,.sRightPhoto').hover(function(){
		clearInterval(timer_zhuchiren);
	},function(){
		timer_zhuchiren=setInterval(gundong,50);
	});
	$('.sLeftPhoto').click(function(){
		var curleft=$('.photoPics').scrollLeft();
		curleft-=830;
		$('.photoPics').animate({scrollLeft:curleft}, "slow");
	});
	$('.sRightPhoto').click(function(){
		var curleft=$('.photoPics').scrollLeft();
		curleft+=830;
		$('.photoPics').animate({scrollLeft:curleft}, "slow");
	});
});