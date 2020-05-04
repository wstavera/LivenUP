$( () => {
	
	//On Scroll Functionality
	/* $(window).scroll( () => {
		var windowTop = $(window).scrollTop();
		windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
		windowTop > 100 ? $('ul').css('top','100px') : $('ul').css('top','160px');
	}); */

	/* nueva  */
	$(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
			$("#mainNav").addClass("ocultar");
			$("#mainNav").removeClass("visualizar");
        } else {
			$("#mainNav").removeClass("ocultar");
			$("#mainNav").addClass("visualizar");
        }
      });


	
	//Click Logo To Scroll To Top
	$('#logo').on('click', () => {
		$('html,body').animate({
			scrollTop: 0
		},500);
	});
	
	//Smooth Scrolling Using Navigation Menu
/* 	$('a[href*="#"]').on('click', function(e){
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		},500);
		e.preventDefault();
	}); */
	
	//Toggle Menu
/* 	$('#menu-toggle').on('click', () => {
		$('#menu-toggle').toggleClass('closeMenu');
		$('ul').toggleClass('showMenu');
		
		$('li').on('click', () => {
			$('ul').removeClass('showMenu');
			$('#menu-toggle').removeClass('closeMenu');
		});
	}); */
	
});