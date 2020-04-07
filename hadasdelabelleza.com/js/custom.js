/**
Core script to handle the entire layout and base functions
**/
function createCart(choices)
{
  var str="";
  if(!choices) return "";

  for(var i=0;i<choices.length;i++)
  {
       str=str+'<li class="clearfix">';
       str= str+'<span class="service_text">'+choices[i][0].service+' <br>'+choices[i][0].ingredient+'<br>';
       if(choices[i][0].discountedprice>0){
        str=str+'Rs '+choices[i][0].discountedprice+' x '+choices[i][0].quantity+'<br>';
       }else{
        str=str+'Rs '+choices[i][0].originalprice+' x '+choices[i][0].quantity+'<br>';
       }
       
       str=str+'</span>';
       str=str+'<span class="service_qty">';
       str=str+'<div class="quantity_section">';
       str=str+'<div class="minus">-</div>';
       str=str+'<div class="qty" data-id="'+choices[i][0].id+'" data-toggle="tooltip" title="Maximum allowed quantity 3" >';
       str=str+choices[i][0].quantity;
       str=str+'</div>';
       str=str+'<div class="plus">+</div>';
       str=str+'</div>';
       str=str+'</span>';
       str=str+'<span class="service_total">';

       if(choices[i][0].discountedprice>0){
        str=str+'Rs. '+parseFloat(choices[i][0].discountedprice)*parseFloat(choices[i][0].quantity);
       }else{
        str=str+'Rs. '+parseFloat(choices[i][0].originalprice)*parseFloat(choices[i][0].quantity);
       }
       //str=str+'Rs. '+parseFloat(choices[i][0].originalprice)*parseFloat(choices[i][0].quantity);
       str=str+'</span>';
       str=str+'<span class="service_remove">';
       str=str+'<div class="close_section">';
       str=str+'<i class="fa fa-times" aria-hidden="true" onClick="deleteProduct('+choices[i][0].id+');"></i>';
       str=str+'</div>';
       str=str+'</span>';
       str=str+'</li>';
  }
  return str;
                                    
}

function forgotpassword(){

  var email = $.trim($("#mobileno2").val());

  if(email == '' ){

    var tt = $("#mobileno2");
              tt.attr('title','Field can\'t blanked');
              tt.tooltip("show");

              setTimeout(function(){
                tt.tooltip("hide")
                tt.tooltip("dispose")
              },2000);

  }else{

      $.ajax({
      type:"POST",
      url:CommonHelper.siteUrl+"login/forgotpassword?json",
      data: {email: email},
      async : true,
      dataType : "json",
      success: function(response){
        if(response.status){
         // $(".enter_otp").html( "<div style='text-align:center;margin: 0 auto 20px auto;padding: 6px 10px;font-size: 14px;background-color: #d4edda !important;width: 86%;' class='alert alert-success'><button class='close' data-dismiss='alert'>&times;</button><span>Reset password link sent successfully</span></div>");

         var tt = $("#mobileno2");
              tt.attr('title','Reset password link sent successfully');
              tt.tooltip("show");

         setTimeout(function(){
          window.location.reload();
         },4000);


        }else{
          var tt = $("#mobileno2");
              tt.attr('title',response.msg);
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
                tt.tooltip("dispose")
              },2000);
        }

      }

    })

  }


  

}

function useridlogin(){

  var email = $.trim($("#mobileno2").val());
  var password = $("#password").val();

  if(email == "" || password == "" ){
    var tt = $("#password");
                    tt.attr('title','email field or password field is blanked');
                    tt.tooltip("show");
                    setTimeout(function(){
                      tt.tooltip("hide")
                      tt.tooltip("dispose")
                    },2000);
  }else{
      //alert(password);
	  $.ajax({
          type:"POST",
          url:CommonHelper.siteUrl+"login/verifyAccount?json",
          data: {email: email,password: password},
          async : true,
          dataType : "json",
          success: function(response){
            //alert(response);
			if(response.status){
				
              if(response.user_detail != ''){

                $('#frontlogin').hide();
                $('.login_using_account').hide();
                $("ul#headermenu").append('<li><a class="nav-link" href="'+CommonHelper.siteUrl+'myprofile">My Profile</a></li>');
                $("ul#headermenu").append('<li><a class="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">Booking</a><ul class="dropdown-menu"><li><a href="'+CommonHelper.siteUrl+'bookinghistory">History</a></li><li><a class="nav-link" href="'+CommonHelper.siteUrl+'bookinghistory/rescheduleCancel">Reschedule/Cancel</a></li></ul></li>');
                $("ul#headermenu").append('<li><a class="nav-link" href="'+CommonHelper.siteUrl+'default_/logout">Logout</a></li>');

              

                $('#userid').val(response.user_detail.id);
                $('#firstname').val(response.user_detail.firstname);
                $('#lastname').val(response.user_detail.lastname);
                $('#address1').val(response.user_detail.address1);
                $('#landmark').val(response.user_detail.landmark);
                $("#floor").val(response.user_detail.floor_no);
                $("#flat_no").val(response.user_detail.flat_no);
                $('#email').val(response.user_detail.email);
                $('#email').attr('readonly',true);
                $('#mobile').val(response.user_detail.mobile_no);
                $('#state').val(response.user_detail.state);
                $('#city').val(response.user_detail.city);
                $('#zip_code').val(response.user_detail.zip_code);
                $('#mobile').removeAttr('readonly');

                $('#login').hide();
                $('#otpverify').hide();
                $('#finalcheckout').show();


              }else{
                var tt = $("#password");
                    tt.attr('title',response.msg);
                    tt.tooltip("show");
                    setTimeout(function(){
                      tt.tooltip("hide")
                      tt.tooltip("dispose")
                    },2000);
                return false;
              }

            }else{

              var tt = $("#password");
                    tt.attr('title',response.msg);
                    tt.tooltip("show");
                    setTimeout(function(){
                      tt.tooltip("hide")
                      tt.tooltip("dispose")
                    },2000);
              return false;
            }

          }
      })
  }

 
}

function isValidMobile(ctrl)
{
      var userPhone = "Mobile should be 10 digit no.";
      var obj=$(ctrl);
      var mobile=$(obj).val();
      var pattern = new RegExp("^[0-9]{10}$");

      if (mobile=='' || pattern.test(mobile)==false) {
          obj.attr('data-original-title', userPhone).tooltip('show');
          obj.tooltip({trigger:"manual"});
          obj.tooltip("show");
          setTimeout(function(){
                obj.tooltip("hide")
          },2000);
          return false;
      }
      return true;
      
}

function editMobile()
{
  $('#mobileno2').attr("readonly", false);
}

function sendOtp(mobileno)
{
  $.ajax(
    {
     type: "POST",
     url: CommonHelper.siteUrl+"login/sendOtp?json",
     data: {mobileno: mobileno},
     async : true,
     dataType : "json",
     success: function(response){
       if(response.message=='Success')
       {
          $('#login').hide();
          $('#otpverify').show();
          $('#finalcheckout').hide();
       }else{
          // var validationmsg = "Artist is not allowed to take service!";          
          var validationmsg = "SMS sending failed please try again later";          
          var gt=$(".mobileno");          
          gt.attr('data-original-title', validationmsg).tooltip('show');
          //gt.tooltip({trigger:"manual"});
          gt.tooltip("show");
          setTimeout(function(){
            gt.tooltip("hide")
            gt.tooltip("dispose")
          },4000);
         return false;
        }      
    }
  });
}

function otpVerification()
{
  if(isValidMobile($("#mobileno2")))
  {
    var mobileno = $('#mobileno2').val();
    var otp = $('#otp').val();
    $('#mobile').val(mobileno);
    otpVerify(mobileno,otp);
  }
  
}

function otpVerify(mobileno,otp)
{

  $.ajax(
    {
     type: "POST",
     url: CommonHelper.siteUrl+"login/verifyOtp?json",
     data: {mobile_no: mobileno,mobile_otp: otp},
     async : true,
     dataType : "json",
     success: function(response){

      console.log(response.city);
        
       if(response.id !== null && response.id !== undefined)
       {

          $('#frontlogin').hide();
          $("ul#headermenu").append('<li><a class="nav-link" href="'+CommonHelper.siteUrl+'myprofile">My Profile</a></li>');
          $("ul#headermenu").append('<li><a class="nav-link" href="'+CommonHelper.siteUrl+'default_/logout">Logout</a></li>');

          //$('#frontmyprofile').show();
          //$('#logout').show();

		      $('#userid').val(response.id);
          $('#firstname').val(response.firstname);
          $('#lastname').val(response.lastname);
          $('#address1').val(response.address1);
          $('#landmark').val(response.landmark);
          $('#email').val(response.email);
          $('#mobile').val(response.mobile_no);
          $('#state').val(response.state);
          $('#city').val(response.city);
          $('#zip_code').val(response.zip_code);
          $('#floor').val(response.floor_no);
		  $('#flat_no').val(response.flat_no);    
          $('#login').hide();
          $('#otpverify').hide();
          $('#finalcheckout').show(); 
		  
       }
       else
       {
		    var tt = $("#otp");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
              },2000);
			  return false;
       }
    }
  });
}

function plusEventListener(obj)
{
  $(obj).click(function(){
    //alert('plus clicked');

           var quantity = parseInt($(this).prev(".qty").html()) +1;
           if(quantity > 3)
           {
              quantity=3;
              var tt = $(this).prev(".qty");

              //console.log(tt);
              tt.tooltip("show");
              setTimeout(function(){
                //tt.tooltip("hide")
                $('body>.tooltip').remove();

              },2000);

           }
           $(this).prev(".qty").html(quantity);
           changeProductQuantity($(this).prev(".qty").data("id"),quantity);
          
           return false;
       });
}

function minusEventListener(obj)
{
  $(obj).click(function(){
           var quantity = parseInt($(this).next(".qty").html()) -1;
           if(quantity < 1) quantity = 1;

           $(this).next(".qty").html(quantity);

          changeProductQuantity($(this).next(".qty").data("id"),quantity);

           return false;
       });
}

function changeProductQuantity(serviceid,qty)
{
  $.ajax(
    {
     type: "POST",
     url: CommonHelper.siteUrl+"login/changeProductQuantity?json",
     data: {id: serviceid,quantity:qty},
     async : true,
     dataType : "json",
     success: function(response){
		 	
       choices=response.servicedata;
       $("#cart").html(createCart(choices));

       var sum=0;
       var totaltime=0;
       var totalquantity=0;
       $.each(choices,function(i,v){
          if(v[0].discountedprice>0){
            sum=sum+v[0].quantity*v[0].discountedprice;
          }else{
            sum=sum+v[0].quantity*v[0].originalprice;
          }
          
          totaltime=totaltime+v[0].quantity*v[0].mins;
          totalquantity=totalquantity+parseInt(v[0].quantity,10);
       });
       
       var cartitemcount=$('.cart_count').html(totalquantity);

      $('#cartitems').text(totalquantity);
      $('#checkoutfinalprice').val(sum);
      $('#txt_end_time').val(totaltime);
      $("#time_slot").html('Duration : '+totaltime+' Mins');
      var cartamt=sum;
      var discount;
      if($('#discountprice').val()){ 
        discount=$('#discountprice').val();
      }else{
        discount=0;
      }
     
      finalamount =parseFloat(cartamt)-parseFloat(discount);

      if(finalamount>=0){

            $("#to").html('Rs. '+finalamount);

      }else{

            $("#to").html('Rs. 0');

      }
    
       $(".plus").each(function(){
          plusEventListener($(this));
      });

      $(".minus").each(function(){
          minusEventListener($(this));
      });
    }
  });
}
 

function deleteProduct(serviceid)
{
  $.ajax(
    {
     type: "POST",
     url: CommonHelper.siteUrl+"login/deleteProduct?json",
     data: {id: serviceid},
     async : true,
     dataType : "json",
     success: function(response){
       choices=response.servicedata;

       $("#cart").html(createCart(choices));
       $("#chkout_"+serviceid).remove();
       
       var sum=0;
       var totaltime=0;
       var totalquantity=0;
       $.each(choices,function(i,v){
          //sum=sum+v[0].quantity*v[0].discountedprice;
          if(v[0].discountedprice>0){
            sum=sum+v[0].quantity*v[0].discountedprice;
          }else{
            sum=sum+v[0].quantity*v[0].originalprice;
          }
          totaltime=totaltime+v[0].quantity*v[0].mins;
          totalquantity=totalquantity+parseInt(v[0].quantity,10);
       });

        var cartitemcount=$('.cart_count').html(totalquantity);

        $('#checkoutfinalprice').val(sum);
        var cartamt=sum;
        $('#txt_end_time').val(totaltime);
        $("#time_slot").html('Duration : '+totaltime+' Mins');

        var discount;
        if($('#discountprice').val()){ 
          discount=$('#discountprice').val();
        }else{
          discount=0;
        }

        finalamount =parseFloat(cartamt)-parseFloat(discount);

        if(finalamount>=0){

              $("#to").html('Rs. '+finalamount);

        }else{

              $("#to").html('Rs. 0');

        }
      
	      
      
        if(parseFloat(sum) < 599){

         var tt = $("#to");
                    tt.tooltip("show");
                    setTimeout(function(){
                      tt.tooltip("hide")
                  },2000);
         return false;
      }



       $(".plus").each(function(){
          plusEventListener($(this));
      });

      $(".minus").each(function(){
          minusEventListener($(this));
      });
    }
  });
}


function validateData()
{

  var total=0;
   var validationmsg ="";

  /*if($("#firstname").val()==""){
     var tt = $("#firstname");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }

  if($("#lastname").val()==""){
     var tt = $("#lastname");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }
  
   if($("#address1").val()==""){
     var tt = $("#address1");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }
  
  
  if($("#landmark").val()==""){
     var tt = $("#landmark");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }
  
  if($("#zip_code").val()==""){
     var tt = $("#zip_code");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }
  
   if($("#email").val()==""){
     var tt = $("#email");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }
  
  
  if($("#state").val()==""){
     var tt = $("#state");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }
 
  if($("#city").val()==""){
     var tt = $("#city");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }
  
  
   if($("#appointment_date").val()==""){
     var tt = $("#appointment_date");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

  return false;
  }



  */
   
$("#loading").css("display","block");
if($("#firstname").val()==""){
    
     validationmsg = "Enter Your First Name!";


    $('html, body').animate({ scrollTop: 20}, 500, 'linear');
 

                   var gt= $('.firstname');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
}



if($("#lastname").val()==""){
    
     validationmsg = "Enter Your Last Name!";

     $('html, body').animate({ scrollTop: 20}, 500, 'linear');

                   var gt= $('.lastname');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
}

if($("#address1").val()==""){
    
     validationmsg = "Enter Your Address!";
     $('html, body').animate({ scrollTop: 20}, 500, 'linear');

                   var gt= $('.address');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
}

if($("#landmark").val()==""){
    
     validationmsg = "Enter Your Landmark!";
      $('html, body').animate({ scrollTop: 80}, 500, 'linear');

                   var gt= $('.landmark');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
}


if($("#zip_code").val()==""){
    
     validationmsg = "Enter Your Zip Code!";
      $('html, body').animate({ scrollTop: 80}, 500, 'linear');

                   var gt= $('.zipcode');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
}

/*

if($("#email").val()==""){
    
     validationmsg = "Enter Your Email!";

                   var gt= $('.continue_btn');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
                   return false;
}*/


/*if($("#state").val()==""){
    
     validationmsg = "Enter Your State!";

                   var gt= $('.continue_btn');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
                   return false;
}*/


if($("#city").val()==""){
    
     validationmsg = "Enter Your City!";
     $('html, body').animate({ scrollTop: 250}, 500, 'linear');

                   var gt= $('.city');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
}


if($("#appointment_date").val()==""){
    
     validationmsg = "Enter Appointment Date!";
     $('html, body').animate({ scrollTop: 300}, 500, 'linear');

                   var gt= $('.appdate');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
}
   
  


  if($('#term_condition').not(':checked').length){
	  validationmsg = "Please check the Terms and Condition!";
	  var tt = $("#term_condition");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);
			setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
  return false;
  
  }


   total=$("#checkoutfinalprice").val();

     if(parseFloat(total) < 599  || total==0 ){

       validationmsg = "Amount should not be less than 599";

                   var gt= $('.continue_btn');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
    }


  if($('#chkdiv').val() ==1){



    /*if($("#addr2").val()==""){
       var tt = $("#addr2");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

      return false;
    }

    if($("#landmark2").val()==""){
       var tt = $("#landmark2");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

      return false;
    }


     if($("#zip_code2").val()==""){
       var tt = $("#zip_code2");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

      return false;
    }

      if($("#alter_state").val()==""){
       var tt = $("#alter_state");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

      return false;
    }


    if($("#alter_city").val()==""){
       var tt = $("#alter_city");
              tt.tooltip("show");
              setTimeout(function(){
                tt.tooltip("hide")
            },2000);

      return false;
    }*/

    if($("#addr2").val()==""){
    
     validationmsg = "Address is required (Separate Address)!";

     $('html, body').animate({ scrollTop: 650}, 500, 'linear');

                   var gt= $('.address2');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
    }


    if($("#landmark2").val()==""){
    
     validationmsg = "Enter Your Landmark (Separate Address)!";

      $('html, body').animate({ scrollTop: 650}, 500, 'linear');

                   var gt= $('.landmark2');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
    }


    if($("#zip_code2").val()==""){
    
     validationmsg = "Enter Your Zip Code (Separate Address)!";

      $('html, body').animate({ scrollTop: 650}, 500, 'linear');

                   var gt= $('.zipcode2');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
    }


    if($("#alter_state").val()==""){
    
     validationmsg = "Enter Your State (Separate Address)!";

      $('html, body').animate({ scrollTop: 650}, 500, 'linear');

                   var gt= $('.state2');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
    }


    if($("#alter_city").val()==""){
    
     validationmsg = "Enter Your City (Separate Address)!";

     $('html, body').animate({ scrollTop: 650}, 500, 'linear');

                   var gt= $('.city2');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
    }


    

  }


  if($('.active_time').length==0){
    
     validationmsg = "Please Select service time!";
     //$('html, body').animate({ scrollTop: 750}, 500, 'linear');


                   var gt= $('.continue_btn');
                    gt.attr('data-original-title', validationmsg).tooltip('show');
                    gt.tooltip({trigger:"manual"});
                    gt.tooltip("show");
                    setTimeout(function(){
                      gt.tooltip("hide")
                    },2000);
					setTimeout(function(){
						alert(validationmsg); $("#loading").css("display","none");
					},2000);
                   return false;
  }




    /*var zipcodeval = $("#zip_code").val();
	var appointment_dateval = $("#appointment_date").val();
	var user_service_start_timeval = $("#txt_start_time").val();
	var user_service_end_timeval = $("#txt_end_time").val();
	
	var myKeyVals = { zipcode : zipcodeval, appointment_date : appointment_dateval, user_service_start_time : user_service_start_timeval, user_service_end_time : user_service_end_timeval }


	var checkAvailability = $.ajax(
    {
		  type: "POST",
		  url: CommonHelper.siteUrl+"bookings/checkAvailability?json",
		  data: myKeyVals,
		  dataType: "json",
		  async : true,
		  success: function(response) {
			  if(response.artist > 0) {
				  console.log("artist : "+response.artist);
				  $("#loading").css("display","none");
				  setTimeout(function(){ return true }, 2000);
			  } else {
				  console.log(response.artist);
				  if($('.alert-danger').length > 0) {
					  $(".alert-danger").show();
				  } else {
					$( "<div style='text-align:center' id='error' class='alert alert-danger alert-mobile'><button class='close' data-dismiss='alert'>Ã—</button><span>Oops! We are fully booked for this time slot. Pls book another slot. Call <a href='tel:7003745230'>7003745230</a> for further details.</span></div>" ).insertBefore( ".inner_section" );
					$(".alert-danger").show();
				  }
				  $('html, body').animate({ scrollTop: 20}, 500, 'linear');
				  $("#loading").css("display","none");
				  return false;
			  }
		  }
	});*/
	
	
	//$("#loading").css("display","none");
   //return false;

}

