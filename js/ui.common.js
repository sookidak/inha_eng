$(document).ready(function(){
	gnb();
	nav();
	Accordion();
});

function gnb(){// GNB
	var gnb_dp1 = $('#header .gnb'),
		etc_dp1 = $('#header .etc_menu >ul >li'),
		spd = 600,
		eft = 'easeOutQuart';

		$(window).on('scroll',function(){
			var scrX = $(window).scrollLeft()
			$('#header').css('left','-'+scrX+'px')
		})

	 gnb_dp1.on('mouseenter focusin', function(){
		if($(this).find('.dp2').length == 0){
			$('#header').stop(true,false).animate({
				'height':'130px'
			},spd,eft)
			gnb_dp1.find('.dp2').css('height','0px');
			return false;
		}else{
			$all_menu.addClass('open');
			$('#header').stop(true,false).animate({
				'height':'320px'
			},spd,eft)
			gnb_dp1.find('.dp2').css('height','auto');
		}
	})

	gnb_dp1.on('mouseleave focusout', function(){
		$('#header').stop(true,false).animate({
			'height':'130px'
		},spd,eft)
		$all_menu.removeClass('open');
		gnb_dp1.find('.dp2').css('height','0px');
	})

	var $hamburger = $(".hamburger");
	var $list_popup = $('.list_popup');
	var $all_menu= $('.all_menu');
	$hamburger.click(function () {
		$(this).toggleClass("is-active");
		if($(this).parents().find('.dp2').length == 0){
			$('#header').stop(true,false).animate({
				'height':'130px'
			},spd,eft)
			gnb_dp1.find('.dp2').css('height','0px');
			return false;
		}
		if ($all_menu.hasClass('open')) {
			$(this).parent('.all_menu').removeClass('open');
			$('#header').stop(true,false).animate({
				'height':'130px'
			},spd,eft)
			gnb_dp1.find('.dp2').css('height','0px');
			return false;
		} else {
			$(this).parent('.all_menu').addClass('open');
			$('#header').stop(true,false).animate({
				'height':'320px'
			},spd,eft)
			gnb_dp1.find('.dp2').css('height','auto');
		}
	});

	$(".lang_link").on('click',function(event) {
		$(".lang_menu").toggleClass('on');
	});

}

function nav(){

	var locationNav = $('.location-nav-wrap');

	locationNav.find('a').on('focus mouseenter', function(event) {
		$(this).addClass('active');
	});

	locationNav.on('blur mouseleave', function(event) {
		$(this).find('a').removeClass('active');
	});
}

function Accordion(){
	$('.accordion_list .title').on('click', function(){
		var spd = 400,
		eft = 'easeOutCubic',
		tgH = $(this).next('div').find('.view').innerHeight();

		if($(this).hasClass('on')){
			$(this).removeClass('on').next('div').stop(true,false).animate({
				'height':'0px'
			},spd,eft)
		}else{
			$(this).parent('li').siblings('li').find('.title').removeClass('on').next('div').stop(true,false).animate({
				'height':'0px'
			},spd,eft);

			$(this).addClass('on').next('div').stop(true,false).animate({
				'height':(tgH+1)+'px'
			},spd,eft);
		}
		return false;
	});
}
