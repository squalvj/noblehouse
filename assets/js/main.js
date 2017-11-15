$(document).ready(function() {
	var placeHolder = $(".callback")
	var deleteLog = false;
	$('#fullpage').fullpage({
		css3: true,
		scrollingSpeed: 2000,
		scrollOverflow: true,
		anchors: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
		onLeave: function(index, nextIndex, direction) {
		    var el = $(this);
		    var child = el.find('.wrapper-content').children()
		    var nextEl = el.parent().children().eq(nextIndex-1)
		    
		    child.each(function(index, el) {
		    	var i = index+=1;
		    	ilang(el,i * 0.8)
		    });
		    var childrenNext = nextEl.find('.wrapper-content').children()
		    opacity(childrenNext)
		    childrenNext.each(function(index, el) {
		    	var i = index+=1;
		    	muncul(el, i* 0.9)
		    });
	  	},
	  	afterLoad: function(anchorLink, index) {
		    //muncul($(this))
	  	},
	});

	function ilang(el, del){
		TweenMax.to(el, del, {y:40, opacity:0 ,ease: Back.easeIn.config(1.7)})
	}

	function muncul(el, del){
		TweenMax.from(el, del, {opacity:0, y:-20 ,delay:2.1, ease: Power4.easeOut})
	}


	function opacity(el){
		TweenMax.set(el,{opacity:1,y:0})
	}

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