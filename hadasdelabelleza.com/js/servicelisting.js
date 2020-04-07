
//var siteURL = "http://localhost/hadasdelabelleza/";

var siteURL = "http://hadasdelabelleza.com/";


var finalprice=0;
var finalquantity=0;

function scrollToServiceBlock(obj)
{
  $('html, body').animate({
        'scrollTop' : $($(obj).data("href")).position().top+20
    });
}

function goToServiceBlock(id,win_width)
{
	var scroll_value = 30;
	if(win_width >= 480 && win_width < 780) {
		scroll_value = 60;
	} else if(win_width >= 320 && win_width < 480) {
		scroll_value = -80;
	} else {
		scroll_value = 30;
	}
	$('html, body').animate({
        'scrollTop' : $(id).position().top+scroll_value
    });
}

function returnToTop()
{
  $('#return-to-top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 100}, 500, 'linear');
  });
}

$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});

function createCarousal()
{
  $("#owl-demo").owlCarousel({
    navigation : true,
    items : 6, 
    itemsDesktop : [992,3],
    itemsDesktopSmall : [768,3], 
    itemsTablet: [600,3],
    itemsMobile : [579,3],// itemsMobile disabled - inherit from itemsTablet option
    pagination : false,
    autoPlay:false,
    responsiveClass:true,
    responsive: true,
    //responsive:{0:{items:1,nav:true},600:{items:3,nav:false},1000:{items:5,nav:true,loop:false}}
  });
}


function plusEventListener(obj)
{
  $(obj).click(function(){

           var quantity = parseInt($(this).prev(".qty").html()) +1;
           if(quantity > 3)
           {
              quantity=3;
              var tt = $(this).prev(".qty");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
              },2000);
           }
           $(this).prev(".qty").html(quantity);

           var serviceid=$(this).parent(".quantity_section").parent().siblings(".listing_dropdown").children(".dummytest").val()

           if(choices.length==0 || $.map(choices,function(n){ if(n[0].id==serviceid) return n}).length==0)
           {
              var data=$(this).parent(".quantity_section").parent().siblings(".listing_dropdown").children(".dummytest").select2('data');
              var choice=data;
              choice["quantity"]=quantity;
              choices.push(choice);
           }
           else
           {
              for(i=0;i<choices.length;i++)
              {
                if(choices[i][0].id==serviceid)
                {
                  choices[i].quantity=quantity;
                }
                
              }
           }
           calculate();
            

           return false;
       });
}

function minusEventListener(obj)
{
  $(obj).click(function(){
  var quantity = parseInt($(this).next(".qty").html()) -1;
  if(quantity < 0) quantity = 0;
              
      if(quantity==0){
      
        /*$(obj).parents('.nextrow').find(".info_tooltip").hide();
        $(obj).parent().parents(".quantity_add_remove").hide();*/
        var obj_select = $(obj).parents('.nextrow').find('select');

        for (var i = choices.length - 1; i >= 0; --i){
          if (choices[i][0].id == $(obj_select).val())
          choices.splice(i,1);
        }

        /*$(obj_select).val(0);
        $(obj_select).trigger('change');
        initialSelect2Placeholder(obj_select);*/
      }

      $(this).next(".qty").html(quantity);
      var serviceid=$(this).parent(".quantity_section").parent().siblings(".listing_dropdown").children(".dummytest").val()

          for(i=0;i<choices.length;i++){

            if(choices[i][0].id==serviceid){
              choices[i].quantity=quantity;
            }

          }

        calculate();
        return false;
       });
}



function createScrollBar(){

  $("a[rel='load-content']").click(function(e){
    e.preventDefault();
    var url=$(this).attr("href");
    $.get(url,function(data){
      $(".content .mCSB_container").append(data); //load new content inside .mCSB_container
      //scroll-to appended content 
      $(".content").mCustomScrollbar("scrollTo","h2:last");
    });
  });
          
  $(".content").delegate("a[href='top']","click",function(e){
    e.preventDefault();
    $(".content").mCustomScrollbar("scrollTo",$(this).attr("href"));
  });
}

function formatState (state) {
            
      var $state;
      var mins='';
      if(state.mins!="")
      {
          mins=' (mins)';
      }

      if(state.discountedprice==0){
        $state = $(
          '<span class="service_name">'+state.service+'</span>'+'<span class="service_product">'+state.ingredient+'</span>'+
          '<span class="service_min">'+state.mins+mins+'</span>'+'<span class="service_price">'+state.originalprice+'</span>'+'<span class="service_info"><span class="tooltip_new"><i class="fa fa-info" aria-hidden="true"></i><span class="tooltip_text_new">'+state.service_description+'</span></span></span>'
        );
      }else{
        $state = $(
          '<span class="service_name">'+state.service+'</span>'+'<span class="service_product">'+state.ingredient+'</span>'+
          '<span class="service_min">'+state.mins+mins+'</span>'+'<span class="service_price_strike"><strike>'+state.originalprice+'</strike></span>'+'<span class="service_price">'+state.discountedprice+'</span>'+'<span class="service_info"><span class="tooltip_new"><i class="fa fa-info" aria-hidden="true"></i><span class="tooltip_text_new">'+state.service_description+'</span></span></span>'
        );
      }        
    
    return $state;
  };

  function filterDropDownDataSource(arr,filterid){
    var result=[];
    result.push({
      id: 0,
      service: 'Select a Service',
      ingredient:'',
      info:'',
      mins:"",
      originalprice:'',
      discountedprice:'<span class="close_service_dd">X</span>' 
    });

    for(i=0;i<arr.length;i++){

      if(arr[i].service_type_id==filterid){
        result.push(arr[i]);
      }

    }
    return result
  }

  function rowTemplate(){

    var str="";
    str="<div class='nextrow'>"
    str=str+"<div class='listing_dropdown'>"
    str=str+"<select class='dummytest' data-serviceid=''></select>";
    str=str+"</div>";
    //str=str+"<div class='info_tooltip' style='display:none'><span data-toggle='tooltip' data-html='true' title='Hooray!'><i class='fa fa-info' aria-hidden='true'></i></span></div>";
    str=str+"<div class='quantity_add_remove' style='display:none'>";
    str=str+"<div class='quantity_section'>";
    str=str+"<div class='minus'>-</div>";
    str=str+"<div class='qty' data-toggle='tooltip' title='Maximum allowed quantity 3'>1</div>"
    str=str+"<div class='plus'>+</div>";
    str=str+"</div>";
    str=str+"<div class='close_section'><i class='fa fa-times' aria-hidden='true' onClick='removeRow(this)'></i></div>";
    str=str+"</div>";
    str=str+"</div>";
    return str;
  }

  function addRow(btn){
    var str=rowTemplate();
    var oldRow=$(btn).parents(".add_section").parents(".quantity_add_remove").parent();
    var last=$(oldRow).parent().parent().parent().parent().find(".nextrow:last");
    var dataserviceid=$(oldRow).find(".dummytest").data("serviceid");
    
    if($(last).find(".dummytest").val() > 0){
      var newRow=$(str).insertAfter($(last));
    
      $(newRow).find(".dummytest").attr("data-serviceid",dataserviceid);

      createSelect2DropDown($(newRow).find(".dummytest"),data);
      initialSelect2Placeholder($(newRow).find(".dummytest"));
      onSelect2Template($(newRow).find(".dummytest"));

      plusEventListener($(newRow).find(".plus"));
      minusEventListener($(newRow).find(".minus"));   
    
    }
    
  }


  function createSelect2DropDown(obj,dataObj){

    $(obj).select2({
      minimumResultsForSearch: Infinity,
      placeholder: "Select a Service",
      allowClear: false,
      data:filterDropDownDataSource(dataObj,$(obj).data("serviceid")),
      templateResult: formatState,
      
    });

    var shownInProgress = false;
    $(obj).on('select2:opening', function (e) {
      if(!shownInProgress){
        e.preventDefault();
        shownInProgress = true;
        $('.service_overlay').show();
        var ele = $(this);
        setTimeout(function(){
          ele.select2("open");
        }, 10);

        return;
      }
      shownInProgress = false;     
    });
   

    $(obj).on('select2:closing', function (e) {
      $('.service_overlay').hide();
      shownInProgress = false;  
    });
        
  }
  
  function initialSelect2Placeholder(obj)
  {
    $(obj).next().find(".select2-selection__rendered").html('<span class="service_name">Select a Service</span>');
  } 



  function onSelect2Template(obj){

     
    $(obj).on("select2:selecting", function (e){
      oldServiceID=$(obj).val();
    });

    $(obj).on("select2:select", function (e) { 

        var state=e.params.data;
	    if($.map(choices,function(n){ if(n[0].id==state.id) return n}).length>0){

            $(obj).val(0);
            $(obj).trigger('change');
            $(obj).parent().siblings(".quantity_add_remove").hide();
            initialSelect2Placeholder(obj);
            if(oldServiceID>0){
	            for (var i = choices.length - 1; i >= 0; --i){
		            if(choices[i][0].id == oldServiceID){
		               choices.splice(i,1);
		            }
	            }
	           calculate(); 
            }
            $(obj).parent().siblings(".info_tooltip").hide();
            return;
	    }

            var $state;
            var mins='';
            if(state.mins!="")
            {
              mins=' (mins)';
            }

            if(state.discountedprice==0)
            {
                $state = 
                '<span class="service_name">'+state.service+'</span>'+'<span class="service_product">'+state.ingredient+'</span>'+
                '<span class="service_min">'+state.mins+mins+'</span>'+'<span class="service_price">'+state.originalprice+'</span>'+'<span class="service_info"><span data-toggle="tooltip"><i class="fa fa-info" aria-hidden="true"></i></span></span>'
              
            }else{
              $state = 
                '<span class="service_name">'+state.service+'</span>'+'<span class="service_product">'+state.ingredient+'</span>'+
                '<span class="service_min">'+state.mins+mins+'</span>'+'<span class="service_price_strike"><strike>'+state.originalprice+'</strike></span>'+'<span class="service_price">'+state.discountedprice+'</span>'+'<span class="service_info"><span data-toggle="tooltip"><i class="fa fa-info" aria-hidden="true"></i></span></span>'
              
            }  

            $(obj).next().find(".select2-selection__rendered").html($state);

            if($(obj).val()=="0")
            {
                $(obj).parent().siblings(".quantity_add_remove").hide();
	            if(oldServiceID>0)
	            {
	                for (var i = choices.length - 1; i >= 0; --i) {
		                if (choices[i][0].id == oldServiceID) {
		                    choices.splice(i,1);
		                }
	                }

	                calculate();
	            }
                $(obj).parent().siblings(".info_tooltip").hide();
				  
				  //find root div for each box
				    var rootBox=$(obj).parents(".listing_box");
				  //check if all dropdown in the box has nothing selected
				    var isAllListSelected=true;
				    $(rootBox).find("select.dummytest").each(function(){
						if($(this).val()!=0){

							isAllListSelected=false
						}
				    });
				    if(isAllListSelected){
					   $(rootBox).find(".nextrow:gt(0)").remove();
				    }
            }else{

		        $(obj).parent().siblings(".quantity_add_remove").show();
		        var tool_tip_parent = $(obj).parent().siblings(".info_tooltip");//.attr("title", state.service_description);
		        
            var tool_tip = tool_tip_parent.find('span').clone();
            tool_tip_parent.find('span').remove();
            tool_tip.removeAttr('title');
            tool_tip.attr('data-title', state.service_description);
            tool_tip.appendTo(tool_tip_parent);
            tool_tip.tooltip({'html':true,'placement':'top','title':function(){
              var title= $(this).attr('data-title').replace(/(?:\r\n|\r|\n)/g, '<br>');
              return '<div style="text-align:left">' + title + '</div>';
            }});

            tool_tip.bind('touchstart', function(){
              $(this).tooltip('toggle');
            }); 

		        $(obj).parent().siblings(".info_tooltip").show();              
		        $(obj).parent().siblings(".quantity_add_remove").find(".quantity_section > .qty").html("1");

              //choice.push();

                for (var i = choices.length - 1; i >= 0; --i) {
                  if (choices[i][0].id == oldServiceID) {
                      choices.splice(i,1);
                     // break;
                  }
                }

	            var choice=$.map(data,function(n){ if(n.id==state.id) return n});
	            choice["quantity"]=parseInt($(obj).parent().siblings(".quantity_add_remove").find(".qty").text(),10);
	            choices.push(choice);
	            calculate();
            }
            
         });

  }   

	function removeRow(obj){

	    var serviceid=$(obj).parent().siblings(".quantity_section").parent().siblings(".listing_dropdown").children(".dummytest").val()

	    $(obj).parent().parent().parent().remove();

	    for (var i = choices.length - 1; i >= 0; --i) {
	        if (choices[i][0].id == serviceid) {
	            choices.splice(i,1);
	        }
	    }
	    calculate();
	}



	function cartItems(){

	    $.ajax(
	    {
	        type: "POST",
	        url: CommonHelper.siteUrl+"login/getCartItemsDetails?json",
	        async : false,
	        dataType : "json",
	        success: function(response){
	          if(response){
	            finalprice=response.totalprice;
	            finalquantity=response.totalservice;
	            
	            $("#totalService").text(finalquantity);
	            $("#totalPrice").text("Rs. "+finalprice);
	          }
	        }
	    });
	}


  	function calculate(){
      var totalService=0;
      var totalPrice=0;

        for(i=0;i<choices.length;i++){
        
        	totalService=totalService+choices[i].quantity;

	        if(choices[i][0].discountedprice>0){

	          totalPrice=totalPrice+parseFloat(choices[i][0].discountedprice)*parseInt(choices[i].quantity,10);

	        }else{

	          totalPrice=totalPrice+parseFloat(choices[i][0].originalprice)*parseInt(choices[i].quantity,10);

	        }
        
        //totalPrice=totalPrice+parseFloat(choices[i][0].originalprice)*parseInt(choices[i].quantity,10);
        }

      //$("#totalService").text(totalService);
      //$("#totalPrice").text("Rs. "+totalPrice);
      var addCartPrice=parseFloat(finalprice)+parseFloat(totalPrice);
      var addCartQuantity=parseInt(finalquantity)+parseInt(totalService);

      $("#totalService").text(addCartQuantity);
      $("#totalPrice").text("Rs. "+addCartPrice);
    } 



  

   function checkvalidation(){

    var totprice =0;
    var validationmsg ="";
    var flag=true;

	    for(i=0;i<choices.length;i++){

	        totprice=totprice+parseFloat(choices[i][0].originalprice)*parseInt(choices[i].quantity,10);
	    }

        $.ajax(
        {
         type: "POST",
         url: CommonHelper.siteUrl+"login/getCartItemsCost?json",
         async : false,
         dataType : "json",
	        success: function(response){
		        if(response){
              //console.log(response.totalvalue);return false;
		          cartprice=response.totalvalue;
		          finalprice=parseInt(totprice)+parseInt(cartprice);

		            if(parseFloat(finalprice) <= 599){
                  finalprice=0;                     //Changes by surojit sir
		            validationmsg = "Minimum amount 599";
		            var ct= $('.continue_btn');
                            ct.attr('data-original-title', validationmsg).tooltip('show');
                            ct.tooltip({trigger:"manual"});
                            ct.tooltip("show");
                            setTimeout(function(){
                            ct.tooltip("hide")
                            },2000);
		                flag=false;
		            }

		        }
	        
	        }
      });

        if(!flag)
          return flag;
      /*if(parseFloat(totprice) < 599){

        validationmsg = "Minimum amount should not be less than 599";

         var ct= $('.continue_btn');
                    ct.attr('data-original-title', validationmsg).tooltip('show');
                    ct.tooltip({trigger:"manual"});
                    ct.tooltip("show");
                    setTimeout(function(){
                      ct.tooltip("hide")
                    },2000);

         return false;

      }*/
       
      
        for(i=0;i<choices.length;i++){

            for(j=0;j<choices.length;j++){

	            if((choices[j][0].id == choices[i][0].id)  && (i!=j) ){
	                   
                    validationmsg = "You should select a service only once";

                    var gt= $('.continue_btn');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
                   return false;

	            }
            }
        }

    
    for(var i=0;i<choices.length;i++){

        choices[i][0]["quantity"]=choices[i].quantity;
    }

  

    var formData=new FormData();
    formData.append("data",JSON.stringify(choices));

    $.ajax(
    {
        type: "POST",
        url: CommonHelper.siteUrl+"services/saveservices?json",
        processData: false,
        contentType: false,
        data: formData,
        success: function(response){
          
	        if(response==1){
	            window.location.href=CommonHelper.siteUrl+"login";
	        }else{
            var gt= $('.continue_btn');
                    gt.attr('data-original-title', response).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
                   return false;
            }

        }
    });


}


   function checkcartvalidation(){

    
    for(var i=0;i<choices.length;i++){

        choices[i][0]["quantity"]=choices[i][0].quantity;
    }

  

    var formData=new FormData();
    formData.append("data",JSON.stringify(choices));

    $.ajax(
    {
        type: "POST",
        url: CommonHelper.siteUrl+"services/savecartservices?json",
        processData: false,
        contentType: false,
        data: formData,
        success: function(response){
          
          if(response==1){
              window.location.href=CommonHelper.siteUrl+"login";
          }else{
            var gt= $('.continue_btn');
                    gt.attr('data-original-title', response).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
                   return false;
            }

        }
    });


    }

    function func(){
      //$(".select2-container--open").on("click",function(){$(".select2-container--open").hide(); })
    }

    $(document).click(function() {
		if($('.select2-results').length) {
			var tooltip_obj = $('.select2-results__option .service_info .tooltip_text_new');
			$.each( tooltip_obj, function() {
			  var desc = $(this).text();
			  var desc_html = desc.replace(/(?:\r\n|\r|\n)/g, '<br>');
			  $(this).html(desc_html);
			});
				
		}
	});
     
        
                   
                