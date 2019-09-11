$('.btn_nav').click(function() {
    // animate content
    $('.page__style').addClass('animate_content');
    $('.page__description').fadeOut(100).delay(2800).fadeIn();
  
    setTimeout(function() {
      $('.page__style').removeClass('animate_content');
    }, 3200);
  
    //remove fadeIn class after 1500ms
    setTimeout(function() {
      $('.page__style').removeClass('fadeIn');
    }, 500);
  
  });
  
  // on click show page after 1500ms
  $('.home_link').click(function() {
    setTimeout(function() {
      $('.home').addClass('fadeIn');
    }, 500);
  });
  
  $('.projects_link').click(function() {
    setTimeout(function() {
      $('.projects').addClass('fadeIn');
    }, 500);
  });
  
  $('.skills_link').click(function() {
    setTimeout(function() {
      $('.skills').addClass('fadeIn');
    }, 500);
  });
  
  $('.about_link').click(function() {
    setTimeout(function() {
      $('.about').addClass('fadeIn');
    }, 500);
  });
  
  $('.contact_link').click(function() {
    setTimeout(function() {
      $('.contact').addClass('fadeIn');
    }, 500);
  });
  
  