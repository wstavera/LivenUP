(function($) { "use strict";

$(function() {
  var header = $(".start-style");
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
  
    if (scroll >= 10) {
      header.removeClass('start-style').addClass("scroll-on");
    } else {
      header.removeClass("scroll-on").addClass('start-style');
    }
  });
});		
  
//Animation

$(document).ready(function() {
  $('body.hero-anime').removeClass('hero-anime');



  /* modal====================================================================================== */
  setTimeout(function(){
    $( document ).ready(function() {
    $('#myModal').modal('toggle')
  });
  }, 50);

  setTimeout(function(){
    $( document ).ready(function() {
    $('#myModal').modal('hide')
  });
  }, 6500);
  /* modal====================================================================================== */



});




//Menu On Hover
  
$('body').on('mouseenter mouseleave','.nav-item',function(e){
    if ($(window).width() > 750) {
      var _d=$(e.target).closest('.nav-item');_d.addClass('show');
      setTimeout(function(){
      _d[_d.is(':hover')?'addClass':'removeClass']('show');
      },1);
    }
});	

//Switch light/dark

$("#switch").on('click', function () {
  if ($("body").hasClass("dark")) {
    $("body").removeClass("dark");
    $("#switch").removeClass("switched");

    $("#metrics").removeClass("metrics-dark");

    $("#footer").removeClass("footer-dark");
    $("#fTitle1").removeClass("fTitle-dark");
    $("#fTitle2").removeClass("fTitle-dark");
    $("#fTitle3").removeClass("fTitle-dark");
    $("#iconos").removeClass("social-icons-dark");

    
  }
  else {
    $("body").addClass("dark");
    $("#switch").addClass("switched");

    $("#metrics").addClass("metrics-dark");

    $("#footer").addClass("footer-dark");
    $("#fTitle1").addClass("fTitle-dark");
    $("#fTitle2").addClass("fTitle-dark");
    $("#fTitle3").addClass("fTitle-dark");
    $("#iconos").addClass("social-icons-dark");

  }
});  

})(jQuery); 