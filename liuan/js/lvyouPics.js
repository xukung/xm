$(document).ready(function() {
	var lvNums=$('.lvyouPics').children().length;
	$('.lvyouPics').width(250*lvNums);
	$('.sLeftLvyou').click(function(){
		var curleft=$('.outLvyou').scrollLeft();
		curleft-=250;
		$('.outLvyou').animate({scrollLeft:curleft}, "slow");
	});
	$('.sRightLvyou').click(function(){
		var curleft=$('.outLvyou').scrollLeft();
		curleft+=250;
		$('.outLvyou').animate({scrollLeft:curleft}, "slow");
	});
});