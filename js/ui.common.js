$(document).ready(function(){
	gnb();
	nav();
	supportFaq();
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

function supportFaq(){
	$('.faq_list .question').on('click', function(){
		var spd = 400,
		eft = 'easeOutCubic',
		tgH = $(this).next('div').find('.view').innerHeight();

		if($(this).hasClass('on')){
			$(this).removeClass('on').next('div').stop(true,false).animate({
				'height':'0px'
			},spd,eft);
		}else{
			$(this).parent('li').siblings('li').find('.question').removeClass('on').next('div').stop(true,false).animate({
				'height':'0px'
			},spd,eft);

			$(this).addClass('on').next('div').stop(true,false).animate({
				'height':tgH+'px'
			},spd,eft);
		}
		return false;
	});
}

function sideMypage(){//side mypage
	var $btn = $('#header .btn_mypage');
	var $sideMypage = $('#side_mypage');
	var spd = 0.5;
	var eft = Quart.easeInOut;
	alarmClose();

	var UserAgent = navigator.userAgent;
	if(UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
		var clickEvent_s = 'touchstart';
		var clickEvent_e = 'touchend';
	}else{
		var clickEvent_s = 'mousedown';
		var clickEvent_e = 'click';
	}

	$btn.on('click', function(){//side mypage open
		TweenLite.to($('.nav li').removeClass('on').attr('style',''))
		TweenLite.to($('#header, #appbar').addClass('fixed'),spd,{ease:eft,left:'74%'})
		TweenLite.to($('#wrap').addClass('fixed'),spd,{ease:eft,left:'74%'})
		TweenLite.to($sideMypage,spd,{ease:eft,left:'0'})
		TweenLite.to($sideMypage.find('.dim').css('position','fixed'),spd,{ease:eft,opacity:0.4,onComplete:function(){$('body').on('touchmove', function(e){e.preventDefault()}); }})
	})

	$sideMypage.find('.dim').on(clickEvent_s, function(){//side mypage close
		sideMypage_close()
	})

	if ($.support.pjax) {//pjax support check

		$sideMypage.find('a[data-pjax="menu"]').on('click', function(event) {//link click
			event.preventDefault();
			var t = $(this);
			$(this).parent().addClass('on');
			sideMypage_close()
			setTimeout(function(){
				pjaxchange(t);
			},500)
		});

		$sideMypage.find('li.depth1 a').on('click', function(event) {//gnb 2depth
			event.preventDefault();
			var spd = 700,
			eft = 'easeOutQuint';
			var h = $(this).next('.depth2').find('>ul').innerHeight();
			if($(this).hasClass('active')){
				$(this).removeClass('active').next('.depth2').stop(true,false).animate({
					'height':'0px'
				},spd,eft, function(){
					scrollRefreshFn()
				});
			}else{
				$(this).parent('li').siblings('li.depth1').find('a').removeClass('active').next('.depth2').stop(true,false).animate({
					'height':'0px'
				},spd,eft);

				$(this).addClass('active').next('.depth2').stop(true,false).animate({
					'height':h+'px'
				},spd,eft, function(){
					scrollRefreshFn()
				});
			}
			return false;
		});
	};

	function sideMypage_close(){//side mypage close
		TweenLite.to($sideMypage.find('.dim'),spd,{ease:eft,opacity:0})
		TweenLite.to($('#header, #appbar'),spd,{ease:eft,left:0})
		TweenLite.to($('#wrap'),spd,{ease:eft,left:0})
		TweenLite.to($sideMypage,spd,{ease:eft,left:'-74%',onComplete:function(){
			$('#header, #appbar').removeClass('fixed').attr('style','');
			$('#wrap').removeClass('fixed').attr('style','');
			$sideMypage.find('.dim').css('position','absolute')
			$('body').off('touchmove');


			$sideMypage.find('li.depth1 a').removeClass('active').next('.depth2').stop(true,false).css({'height':'0px'});
			scrollRefreshFn();

		}})
	}

	function alarmClose(){
		gnbSwiper = new Swiper('#side_mypage .side_mypage_content', {
		     direction: 'vertical',
		     slidesPerView: 'auto',
		     mousewheelControl: true,
		     freeMode: true
		});
	}

	function scrollRefreshFn(){
		gnbSwiper.onResize();
	}
}


function sideAlarm(){//side alarm
	var $btn = $('#header .btn_alarm');
	var $sideAlarm = $('#side_alarm');
	var spd = 0.5;
	var eft = Quart.easeInOut;
	var gnbSwiper = null;
	alarmClose();

	var UserAgent = navigator.userAgent;
	if(UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
		var clickEvent_s = 'touchstart';
		var clickEvent_e = 'touchend';
	}else{
		var clickEvent_s = 'mousedown';
		var clickEvent_e = 'click';
	}

	$btn.on('click', function(){//side alarm open
		TweenLite.to($('#header, #appbar').addClass('fixed'),spd,{ease:eft,right:'74%'})
		TweenLite.to($('#wrap').addClass('fixed'),spd,{ease:eft,right:'74%'})
		TweenLite.to($sideAlarm,spd,{ease:eft,right:'0'})
		TweenLite.to($sideAlarm.find('.dim').css('position','fixed'),spd,{ease:eft,opacity:0.4,onComplete:function(){$('body').on('touchmove', function(e){e.preventDefault()}); }})
		scrollRefreshFn()
	})

	$sideAlarm.find('.dim').on(clickEvent_s,  function(){//side alarm close
		sideAlarm_close()
	})

	$('.alarm_close').on('click', function(){//alarm close
		var $this = $(this);
		TweenLite.to($(this).parent(),0.7,{ease:Quint.easeInOut,height:0,onComplete:function(){
			$this.parents('.alarm_list').hide();
			scrollRefreshFn();
		}})
	})

	function sideAlarm_close(){//side mypage close
		TweenLite.to($sideAlarm.find('.dim'),spd,{ease:eft,opacity:0})
		TweenLite.to($('#header, #appbar'),spd,{ease:eft,right:0})
		TweenLite.to($('#wrap'),spd,{ease:eft,right:0})
		TweenLite.to($sideAlarm,spd,{ease:eft,right:'-74%',onComplete:function(){
			$('#header, #appbar').removeClass('fixed')
			$('#wrap').removeClass('fixed')
			$sideAlarm.find('.dim').css('position','absolute')
			$('body').off('touchmove');
		}})
	}

	function alarmClose(){
		gnbSwiper = new Swiper('#side_alarm .side_alarm_content', {
		     direction: 'vertical',
		     slidesPerView: 'auto',
		     mousewheelControl: true,
		     freeMode: true
		});
	}

	function scrollRefreshFn(){
		gnbSwiper.onResize();
	}

}


function logoChange(){//logo change
	var logoList = $('.logo_wrapper > a');
	var imgCount = logoList.children().length;
	var duration = 5000;
	var autoPlay = true;
	var spd = 1200;
	var idx = 0;

	if(autoPlay == true) {
		setInterval(autoSlide, duration);
	}

	function autoSlide() {
		var next = (++idx % imgCount);
		$(logoList.get(next - 1)).fadeOut(spd);
		$(logoList.get(next)).fadeIn(spd);
	}
}


function lottopickLoading(){//lottopick loading
	var count = 0;
	function rotate() {
		var elem = document.getElementById('lottopick_loading');
		elem.style.MozTransform = 'scale(1) rotate('+count+'deg)';
		elem.style.WebkitTransform = 'scale(1) rotate('+count+'deg)';
		if (count==360) { count = 0 }
		count+=20;
		window.setTimeout(rotate, 50);
	}
	window.setTimeout(rotate, 50);
}


function historyTab(){//history tab
	$('.history .tab_wrapper .tab_item').on('click', function(){
		var $tabBtn = $(this).closest('.tab_item'),
			$tabCont = $tabBtn.closest('.tab_wrapper').parents().find('.history_cont');

		$tabBtn.addClass('active').siblings().removeClass('active');

		$tabCont.addClass('hide').removeClass('show');
		$tabCont.eq($tabBtn.index()).addClass('show').removeClass('hide');

		if($('.tab_item:last-child').hasClass('active')){
			$(this).parents('.history').css('background','#fff');
			$('.purchase_ticket_info').addClass('hide').removeClass('show');
		}
		else{
			$(this).parents('.history').css('background','none');
			$('.purchase_ticket_info').addClass('show').removeClass('hide');
		}
		return false;
	});
}


function supportFaq(){
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

function winnerSummary(){
	$('.winner_summary a').on('click', function(){
		var spd = 400,
		eft = 'easeOutCubic',
		tgH = $(this).next('div').find('table').innerHeight();

		if($(this).hasClass('on')){
			$(this).removeClass('on').next('div').stop(true,false).animate({
				'height':'0px'
			},spd,eft)
		}else{
			$(this).parent('div').siblings('.winner_summary').find('a').removeClass('on').next('div').stop(true,false).animate({
				'height':'0px'
			},spd,eft);

			$(this).addClass('on').next('div').stop(true,false).animate({
				'height':tgH+'px'
			},spd,eft);
		}
		return false;
	});
}


function newsSwipe(){//news swipe
	var newsSwiper = new Swiper('.best_news .swiper-container', {
		direction: 'horizontal',
		slidesPerView: 'auto',
		//autoplay: 4000,
		autoHeight: true,
		simulateTouch: false,
		draggable: false,
		nextButton: '.swiper-button-next',
    	prevButton: '.swiper-button-prev',
		pagination: '.swiper-pagination',
        paginationClickable: true,
	});
}


function recommendClick(){//recommend click effect
	$('.recommend .cbutton').on('click', function(){
		var $ele = $(this);
		$ele.addClass("cbutton_click");
		setTimeout(function(){
			$ele.removeClass("cbutton_click");
		}, 400);
		if($ele.hasClass('on')){
			$ele.removeClass('on');
		}else{
			$ele.addClass('on');
		}
	});
}


function btn_eft(){//script click
	$('a[data-pjax="script"]').on('click', function(event) {
		var $this = $(this);
		var $w = $this.innerWidth();
		btn_eft_ripple($this,$w);
	});
}


function btn_eft_ripple(t,w){//btn effeact
	var $this = t,
		$w = w;

	$this.append('<div class="mask"></div>');
	TweenLite.to($this.find('.mask'),0.5,{ease:Cubic.easeOut,x:-($w/2),y:-($w/2),width:$w,height:$w,opacity:0,onComplete:function(){
		$this.find('.mask').remove();
	}});
}


function mainSectionSwipe(){//main section swipe
	var $wrapper = $('#main_wrapper');
	var $section = $wrapper.find('.section');
	var $idx = 0;
	var $pidx;
	var $total = $section.size();
	var $sectionSwipe = 'stop';
	var $dh = $(window).innerHeight();

	mainSwiper = new Swiper('#main_wrapper >.swiper-container', {
	  direction:'vertical',
		slidesPerView: 1,
		onInit:function(){
			$('#main_wrapper >.swiper-container').addClass('first')
		},
		onSlideChangeStart:function(){
			var $idx = mainSwiper.activeIndex;
			var $pidx = mainSwiper.previousIndex;
			var $hdH = $('#header').innerHeight();
			if($idx == 0){
				TweenLite.to($('#header'),0.4,{ease:Expo.easeInOut,top:0});
				$('#main_wrapper >.swiper-container').addClass('first')
			}else{
				TweenLite.to($('#header'),0.4,{ease:Expo.easeInOut,top:-$hdH});
				$('#main_wrapper >.swiper-container').removeClass('first')
			};
		}
	});
}


function mainJackpot(){//main section jackpot
	var $jackpot = $('#jackpot');
	var jackpot_Swiper = new Swiper('#jackpot >.section_content >.swiper-container', {//ball number swiper
	    slidesPerView: '1',
	    pagination: '#jackpot >.section_content >.swiper-container >.swiper-pagination',
	    paginationClickable: false,
	    onSlideChangeStart:function(){
	    	var $idx = jackpot_Swiper.activeIndex
	    	$jackpot.find('.tab').eq($idx).addClass('active').siblings('div').removeClass('active')
			jackpotBar($idx);
	    },
	});

	$('#jackpot .game_tab_wrapper .tab').on('click', function(){
		$(this).addClass('active').siblings('div').removeClass('active');
		var $idx = $(this).index();
		jackpot_Swiper.slideTo($idx)
		jackpotBar($idx);
	})

	function jackpotBar(i){
		TweenLite.to($jackpot.find('.bar'),0.4,{ease:Cubic.easeOut,left:(i*50)+'%'})
	};

	var pb_rec_Swiper = new Swiper('#jackpot #swiper-pb .recommend_swiper .swiper-container', {//mytickets swiper
			slidesPerView: '1',
			autoplay:2500,
			pagination: '#jackpot #swiper-pb .recommend_swiper .swiper-pagination',
			paginationClickable: false,
			nested:true
	});

	var mg_rec_Swiper = new Swiper('#jackpot #swiper-mg .recommend_swiper .swiper-container', {//mytickets swiper
			slidesPerView: '1',
			autoplay:2500,
			pagination: '#jackpot #swiper-mg .recommend_swiper .swiper-pagination',
			paginationClickable: false,
			nested:true
	})

	var swiperSubject = new Swiper('#scrollwrap >.swiper-container',{
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    nested:true
  })
}


function mainIntroduction(){//main section introduction
	var $introduction = $('#lottopia_introduction');
	var introduction_Swiper = new Swiper('#lottopia_introduction .swiper-container', {
	    slidesPerView: '1',
	    pagination: '#lottopia_introduction .swiper-pagination',
	    paginationClickable: false,
	    onSlideChangeStart:function(){
	    	var $idx = introduction_Swiper.activeIndex
	    	$introduction.find('.tab').eq($idx).addClass('active').siblings('div').removeClass('active')
	    }
	});
}
function mainMytickets(){//main section mytickets
	var $mytickets = $('#mytickets');
	var mytickets_Swiper = new Swiper('#mytickets .swiper-container', {//mytickets swiper
	    slidesPerView: 'auto',
	    slidesOffsetBefore:15,
	    slidesOffsetAfter:15,
	    spaceBetween:15,
	})
};


function ticket_swipeBtn(min,max){//ticket swipe btutton
	$('table tr').each(function(){
		if($(this).find('td span').hasClass('hidden_btn')){
			$(this).swipe({
				swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection){
					var spd = 0.3,
						eft = Back.easeOut;
					if(direction == 'left' && distance >= max){
						$(this).find('td .hidden_btn').addClass('open');
						swipeBtn($(this),min);
					}else if(direction == 'right' && distance >= max){
						$(this).find('td .hidden_btn').removeClass('open');
						swipeBtn($(this),0);
					}

					function swipeBtn(t,w){
						TweenLite.to(t.find('td'),spd,{ease:eft,'left':'-'+w+'px'})
						TweenLite.to(t.find('td .hidden_btn'),spd,{ease:eft,'width':''+w+'px','right':'-'+w+'px'})
						event.preventDefault();
						event.stopPropagation();
						return false;
					}
				},
				preventDefaultEvents:false,
				triggerOnTouchEnd:false,
				threshold:max
			})
		}
	})
}


function multipleSwitch(obj){//powerplay, megaplier
	if($(obj).text() == 'NO'){
		$(obj).text('YES')
	}else{
		$(obj).text('NO')
	}
}


function modalPopup(){//modal popup
	$('.button.popup').on('click', function(){
		var p_target = $(this).attr('href');
		$('body').on('touchmove', function(e){e.preventDefault();return false;});
		$('body').addClass('fixed')
		$('#wrap').append('<div id="dim"></div>');
		TweenLite.to($('#dim'),0.7,{ease:Power4.easeOut,opacity:0.5});
		$(p_target).show();
		if($(this).attr('data-popup') == 'fullpopup'){//fullpage layoutpopup
			$(p_target).find('.modalpopup_content').wrap('<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide"></div></div></div>')
			TweenLite.to($(p_target),0.5,{ease:Back.easeOut,left:10,top:10,right:10,bottom:10,onComplete:function(){
				TweenLite.to($(p_target).find('.modalpopup_content').show(),0.5,{ease:Power4.easeOut,opacity:1});
				var popupSwiper = new Swiper('.modalpopup_wrapper .swiper-container', {
					 direction: 'vertical',
					 slidesPerView: 'auto',
					 mousewheelControl: true,
					 freeMode: true
				});
			}})
		}else if($(this).attr('data-popup') == 'layerpopup'){//layoutpopup
			var p_t = $(this).attr('data-popup-height')
			TweenLite.to($(p_target).css('height',p_t+'px'),0.7,{ease:Back.easeOut, top:'50%', marginTop:'-'+(p_t/2)+'px', left:10,right:10, onComplete:function(){
				TweenLite.to($(p_target).find('.modalpopup_content').show(),0.7,{ease:Power4.easeOut,opacity:1});
			}})
		}else if($(this).attr('data-popup') == 'tooltip'){//tooltip
			TweenLite.to($(p_target),0.1,{top:'50%', marginTop:'-100px', left:10,right:10, onComplete:function(){
				TweenLite.to($(p_target).find('.modalpopup_content').show(),0.7,{ease:Power4.easeOut,opacity:1});
			}})
		}
		return false;
	})

	$('.modalpopup_wrapper .p_close').on('click', function(){
		var p_target = $(this).parents('.modalpopup_wrapper');
		TweenLite.to(p_target,0.7,{ease:Power4.easeOut,top:'100%',marginTop:0,onComplete:function(){
			$('body').removeClass('fixed')
			$('#wrap').find('#dim').remove();
			$('body').off('touchmove');
			$('.modalpopup_wrapper').attr('style','');

			$('.modalpopup_wrapper .swiper-container,.modalpopup_wrapper .swiper-wrapper,.modalpopup_wrapper .swiper-slide').contents().unwrap();

			//$('.modalpopup_wrapper .modalpopup_content').attr('style','');
		}});
		TweenLite.to($('#dim'),0.7,{ease:Power4.easeOut,opacity:0});
		return false;
	})
}
