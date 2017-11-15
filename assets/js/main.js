

$(document).ready(function() {
	var bullet = $(".slide").length
	var interval
  	for (var i = 1; i <= bullet; i++) {
  		$(".bullet-nav").append('<a class="bullet-child" href="#one/slide'+i+'"></a>')
  	}
	if ($("#fullpage").length == 1){
		$('#fullpage').fullpage({
			css3: true,
			scrollingSpeed: 2000,
			scrollOverflow: true,
			anchors: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
			onLeave: function(index, nextIndex, direction) {
			    var el = $(this);
			    var child = el.find('.wrapper-content').children()
			    var nextEl = el.parent().children().eq(nextIndex-1)
		     	var childrenNext = nextEl.find('.wrapper-content').children()
			    opacity(childrenNext)
			    child.each(function(index, el) {
			    	var i = index+=1;
			    	ilang(el,i * 0.8)
			    });
			   
			    
			    childrenNext.each(function(index, el) {
			    	var i = index+=1;
			    	muncul(el, i* 0.9)
			    });
		  	},
		  	afterLoad: function(anchorLink, index) {
			    //muncul($(this))
		  	}
		});
	}
	if ($("#fullpage-office").length == 1){
		$('#fullpage-office').fullpage({
			scrollingSpeed: 2500,
			scrollOverflow: true,
			anchors: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine','ten'],
			//slidesNavigation: false,
			controlArrows: false,
		slidesNavPosition: 'bottom',
			onLeave: function(index, nextIndex, direction) {
			    var el = $(this);
			    var child = el.find('.items-left-right').children()
			    var nextEl = el.parent().children().eq(nextIndex-1)
			    ilangStagger(child,.5)
			    var childrenNext = nextEl.find('.items-left-right').children()
			    opacity(childrenNext)
			   	munculStagger(childrenNext,.3)
			   	if (nextIndex == 1){
			   		stopAutoScroll();
			   	}
			   	switch (direction){
			   		case 'up':
			   			prevBullet();
			   			break;
			   		case 'down':
			   			nextBullet();
			   			break;
			   	}
		  	},
		  	afterLoad: function(anchorLink, index) {
		  		
		  	},
	  	 	afterRender: function () {
  	 			startAutoScroll()
	  	 		$(".bullet-child").eq(0).addClass('active')
	  	 		initBulletRight($(".section"))
			},
			onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
				
			}
		});
	}

	function initBulletRight(el){
		var count = el.length
		var anchor
		for (var i = 1; i <= count; i++){
			anchor = el.eq(i-1).data('anchor')
			$(".bullet-right").append('<a class="bullet-right-child" href="#'+anchor+'"><span></span></a>')
		}
		$(".bullet-right-child").eq(0).addClass('active')
	}

	function startAutoScroll(){
		interval = setInterval(function () {
			$.fn.fullpage.moveSlideRight();
			var bullet = $(".bullet-child.active")
			var next = bullet.next();
			if (bullet.is(':last-child')){
				bullet.removeClass('active')
				bullet = $(".bullet-nav").children('.bullet-child:first-child')
				next = bullet
			}
			bullet.removeClass('active')
			next.addClass('active')
		}, 7000);
	}

	function nextBullet(){
		var next = $(".bullet-right-child.active").next();
		$(".bullet-right-child").removeClass('active')
		next.addClass('active')
	}

	function prevBullet(){
		var prev = $(".bullet-right-child.active").prev();
		$(".bullet-right-child").removeClass('active')
		prev.addClass('active')
	}

	function stopAutoScroll(){
		clearInterval(interval);
	}

	function ilang(el, del){
		TweenMax.to(el, del, {y:40, opacity:0 ,ease: Back.easeIn.config(1.7)})
	}

	function muncul(el, del){
		TweenMax.from(el, del, {opacity:0, y:-20 ,delay:2.1, ease: Power4.easeOut})
	}

	function ilangStagger(el,del){
		TweenMax.staggerTo(el, 1, {y:40, opacity:0 ,ease: Back.easeIn.config(1.7)}, del)
	}

	function munculStagger(el,del){
		TweenMax.staggerFrom(el, .5, {opacity:0, y:-20 ,delay:2.1, ease: Power4.easeOut},del)
	}


	function opacity(el){
		TweenMax.set(el,{opacity:1,y:0})
	}

	$('.bullet-right').on('click', '.bullet-right-child', function() {
		$(".bullet-right-child").removeClass('active')
		$(this).addClass('active')
		console.log($(this))
	});

	$(".bullet-child").click(function(event) {
		$(".bullet-child").removeClass('active')
		stopAutoScroll();
		$(this).addClass('active')
	});

	$("#close-nav").click(function(event) {
		$(".side-nav").removeClass('active')
	 	$.fn.fullpage.setMouseWheelScrolling(true);
    	$.fn.fullpage.setAllowScrolling(true);
    	TweenMax.to($(".bg-black"),.5, {opacity:0,right:'-100vw'})
	});
	$("#open-nav").click(function(event) {
		$(".side-nav").addClass('active')
		$.fn.fullpage.setMouseWheelScrolling(false);
		$.fn.fullpage.setAllowScrolling(false);
		TweenMax.to($(".bg-black"),.5, {opacity:1,right:0})
	});

	$(".bg-black").click(function(event) {
		$(".side-nav").removeClass('active')
	 	$.fn.fullpage.setMouseWheelScrolling(true);
    	$.fn.fullpage.setAllowScrolling(true);
    	TweenMax.to($(".bg-black"),.5, {opacity:0,right:'-100vw'})
    	$(".contact-nav").removeClass('active')
		TweenMax.to($(".menu-ul"), .10, {opacity:1})
	});

	$("#contact-btn").click(function(event) {
		$(".contact-nav").addClass('active')
		TweenMax.to($(".menu-ul"), .10, {opacity:0})
	});

	$("#back-contact").click(function(event) {
		$(".contact-nav").removeClass('active')
		TweenMax.to($(".menu-ul"), .10, {opacity:1})
	});

	$(".btn-close-modal").click(function(event) {
		TweenMax.to($(".modal"), 1, {opacity:0, display:'none'})
	});

	function init(){
		var arrow = $(".wrapper-arrow img")
		TweenMax.fromTo(arrow, 2, {y:-20,ease:Circ},{y:20,repeatDelay:1, ease:Circ, repeat:-1,})
	}
	init();
});