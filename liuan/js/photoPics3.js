$(document).ready(function() {
	$('.sUp').click(function(){
		var curtop=$('.photoPics').scrollTop();
		curtop-=180;
		$('.photoPics').animate({scrollTop:curtop}, "slow");
	});
	$('.sDown').click(function(){
		var curtop=$('.photoPics').scrollTop();
		curtop+=180;
		$('.photoPics').animate({scrollTop:curtop}, "slow");
	});
});