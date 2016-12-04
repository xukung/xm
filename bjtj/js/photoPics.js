$(document).ready(function() {
	var timer_zhuchiren=setInterval(gundong,50);
	var step=1;
	function gundong(){
		
		//此处数值根据实际需求，3副图为1065，6副为1065×2，9副为1065×3
		if($('.photoPics').scrollLeft() === 1065){
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
		curleft-=1065;
		$('.photoPics').animate({scrollLeft:curleft}, "slow");
	});
	$('.sRightPhoto').click(function(){
		var curleft=$('.photoPics').scrollLeft();
		curleft+=1065;
		$('.photoPics').animate({scrollLeft:curleft}, "slow");
	});
});