$(document).ajaxSend(function(event, request, settings) {
    $.blockUI({
           message: 'Please wait', 
           css: { 
           border: 'none', 
           padding: '15px', 
           backgroundColor: '#000', 
           '-webkit-border-radius': '10px', 
           '-moz-border-radius': '10px',
           opacity: .5, 
           color: '#fff' 
         } }); 
 });

 $(document).ajaxComplete(function(event, request, settings) {
   $.unblockUI();
 });

 $(function() {
     $('#return-to-top').on('click', function(e) {
       e.preventDefault();
       $('html, body').animate({ scrollTop: 0}, 400, 'linear');
     });
     
     if(detectmob()) {

     } else {
         $(".app_store_section").css('display','block');
     }
 });

 $(window).scroll(function () {
   var sc = $(window).scrollTop()
   if (sc > 100) {
       $("#header-sroll").addClass("small")
   } else {
       $("#header-sroll").removeClass("small")
   }
 });
 
 function detectmob() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
     return true;
   }
  else {
     return false;
   }
 }