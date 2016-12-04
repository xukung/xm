$(document).ready(function() {
	$('.sLeftPhoto').click(function(){
		var curleft=$('.photoPics').scrollLeft();
		curleft-=980;
		$('.photoPics').animate({scrollLeft:curleft}, "slow");
	});
	$('.sRightPhoto').click(function(){
		var curleft=$('.photoPics').scrollLeft();
		curleft+=980;
		$('.photoPics').animate({scrollLeft:curleft}, "slow");
	});
});