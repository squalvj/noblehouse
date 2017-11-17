

$(document).ready(function() {
	// var bullet = $(".slide").length
	// var interval
 //  	for (var i = 1; i <= bullet; i++) {
 //  		$(".bullet-nav").append('<a class="bullet-child" href="#one/slide'+i+'"></a>')
 //  	}

 	var namaAnchor = []
 	$('.section').each(function(el, i) {
 		namaAnchor[el] = $(this).data('nama')
 	});
 	console.log(namaAnchor)
 	var isInvert = false;
 	var interval = [];
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
			// anchors: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine','ten'],

			//slidesNavigation: false,
			anchors: namaAnchor,
			controlArrows: false,
			//slidesNavPosition: 'bottom',
			onLeave: function(index, nextIndex, direction) {
			    var el = $(this);
			    var child = el.find('.items-left-right').children()
			    var nextEl = el.parent().children().eq(nextIndex-1)
			    ilangStagger(child,.5)
			    var childrenNext = nextEl.find('.items-left-right').children()
			    opacity(childrenNext)
			   	munculStagger(childrenNext,.3)
			   	// if (nextIndex == 1){
			   	// 	stopAutoScroll();
			   	// }
			   	changeBulletNav(nextIndex)
			   	var nextEl = $(".section").eq(nextIndex-1)
			   	var invert = nextEl.find('.invert')
			   	if (invert.length){
			   		fadeInOut($(".top-left").first(), $(".top-left").last())
			   		right($(".top-right").first(),$(".top-right").last() )
			   		opacity2($(".bottom-left").first(), $(".bottom-left").last())
			   		opacity2($(".bottom-right").first(), $(".bottom-right").last())
			   		$(".bullet-right").addClass('invert')
			   	}
			   	else{
			   		fadeInOut($(".top-left").last(), $(".top-left").first())
			   		right($(".top-right").last(),$(".top-right").first() )
			   		opacity2($(".bottom-left").last(), $(".bottom-left").first())
			   		opacity2($(".bottom-right").last(), $(".bottom-right").first())
			   		$(".bullet-right").removeClass('invert')
			   	}
		  	},
		  	afterLoad: function(anchorLink, index) {

		  	},
	  	 	afterRender: function () {
	  	 		//determine which section active and add active class to nav right
	  	 		var container = $(this);
	  	 		var section = container.find('.section')
	  	 		for (var i = 0; i < section.length; i++){
	  	 			section.eq(i).attr('data-count', i);
	  	 		}
	  	 		setTimeout( function(){ 
		  	 		var active = container.find('.fp-section.active')
		  	 		initBulletRight($(".section"),active.data('count'))
			  	}  , 500 );
	  	 		initBulletSlide()
  	 			startAutoScroll()
			},
			onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
				
			}
		});
	}

	function fadeInOut(el, el2){
		TweenMax.to(el, 1, {scale:2,delay:1,opacity:0})
		TweenMax.to(el2, 1, {scale:1,delay:1,opacity:1})
	}

	function right(el,el2){
		TweenMax.to(el, 1, {x:150,opacity:0,delay:1})
		TweenMax.to(el2, 1, {x:0,opacity:1,delay:1})
	}

	function opacity2(el, el2){
		TweenMax.to(el, 1, {opacity:0,delay:1,display:'none'})
		TweenMax.to(el2, 1, {opacity:1,delay:1,display:'flex'})
	}

	function initBulletSlide(){
		var bullet = $(".bullet-nav")
		var parent = bullet.parent()
		var slide = [];
		for (var i = 0; i < parent.length; i++){
			slide[i] = parent.eq(i).find('.slide')

		}
		for (var k = 0; k < slide.length; k++){
			var bulletInside = slide[k].closest('.section').find('.bullet-nav')
			for (var z = 0; z < slide[k].length; z++){
				var it = z+1;
				var it2 = k+1;
				var anchor = slide[k].closest('.section').data('anchor')
				// bulletInside.append('<a class="bullet-child" data-interval="'+ it2 +'" href="#'+anchor+'/slide'+ it +'"></a>')
				bulletInside.append('<a class="bullet-child" data-interval="'+ it2 +'"></a>')
			}
		}
	}

	function initBulletRight(el, eq){
		var count = el.length
		var anchor
		for (var i = 1; i <= count; i++){
			anchor = el.eq(i-1).data('anchor')
			$(".bullet-right").append('<a class="bullet-right-child '+i+'" href="#'+anchor+'"><span></span></a>')
		}
		$(".bullet-right-child").eq(eq).addClass('active')
	}

	function startAutoScroll(){
		var bulletnav = $(".bullet-nav")
		var bfirst = $(".bullet-nav .bullet-child:first-child")
		bfirst.addClass('active')
		for (var i = 0; i < bulletnav.length; i++){
			var container = bulletnav.eq(i)
			var section = container.closest('.section')
			startauto(interval,i, container, section)
		}
		
	}

	function startauto(el, index, container, section){
		el[index] = setInterval(function () {
			if (section.hasClass('active')){
				var bullet = container.find('.bullet-child.active')
				var next = bullet.next();
				if (bullet.is(':last-child')){
					bullet.removeClass('active')
					bullet = container.children('.bullet-child:first-child')
					next = bullet
				}
				bullet.removeClass('active')
				next.addClass('active')
				$.fn.fullpage.moveSlideRight();
			}
		}, 7000);
	}

	function stopAutoScroll(interval){
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

	function changeBulletNav(nextIndex){
		$(".bullet-right .bullet-right-child").removeClass('active')
	   	$(".bullet-right ").find('.'+nextIndex).addClass('active')
	}

	$(".bullet-child").click(function(event) {
		// $(".bullet-child").removeClass('active')
		// stopAutoScroll();
		// $(this).addClass('active')
		event.preventDefault();
	});

	// kocak
	var i =false
	$('[data-toggle="collapse"]').click(function() {
		var parent = $(this).closest('.item-left')
		parent.find('.collapse.in').collapse('hide')
		$(this).parent().next().collapse('toggle')
		parent.find('.btn-accor').not($(this)).removeClass('active')
		$(this).toggleClass('active')
		
	});

	$("#close-nav").click(function(event) {
		$(".side-nav").removeClass('active')
	 	$.fn.fullpage.setMouseWheelScrolling(true);
    	$.fn.fullpage.setAllowScrolling(true);
    	$(".contact-nav").removeClass('active')
    	TweenMax.to($(".menu-ul"), .10, {opacity:1})
    	TweenMax.to($(".bg-black"),.5, {opacity:0,right:'-100vw'})
	});
	$(".open-nav").click(function(event) {
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
		var firstButtonPlus = $('.item-accordion-c.in').prev().find('button')
		firstButtonPlus.addClass('active')
		TweenMax.to($(".top-left").last(), 0, {scale:2,opacity:0})
		TweenMax.to($(".top-right").last(), 0, {x:150,opacity:0})
		TweenMax.to($(".bottom-left").last(), 0, {display:'none', opacity:0})
		TweenMax.to($(".bottom-right").last(), 0, {display:'none', opacity:0})
		TweenMax.fromTo(arrow, 2, {y:-20,ease:Circ},{y:20,repeatDelay:1, ease:Circ, repeat:-1,})

	}
	init();
});