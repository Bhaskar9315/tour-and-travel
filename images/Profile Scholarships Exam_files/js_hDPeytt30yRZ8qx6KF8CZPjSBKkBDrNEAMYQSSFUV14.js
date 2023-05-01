/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, drupalSettings) {
  Drupal.behaviors.activeLinks = {
    attach: function attach(context) {
      var path = drupalSettings.path;
      var queryString = JSON.stringify(path.currentQuery);
      var querySelector = path.currentQuery ? '[data-drupal-link-query=\'' + queryString + '\']' : ':not([data-drupal-link-query])';
      var originalSelectors = ['[data-drupal-link-system-path="' + path.currentPath + '"]'];
      var selectors = void 0;

      if (path.isFront) {
        originalSelectors.push('[data-drupal-link-system-path="<front>"]');
      }

      selectors = [].concat(originalSelectors.map(function (selector) {
        return selector + ':not([hreflang])';
      }), originalSelectors.map(function (selector) {
        return selector + '[hreflang="' + path.currentLanguage + '"]';
      }));

      selectors = selectors.map(function (current) {
        return current + querySelector;
      });

      var activeLinks = context.querySelectorAll(selectors.join(','));
      var il = activeLinks.length;
      for (var i = 0; i < il; i++) {
        activeLinks[i].classList.add('is-active');
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        var activeLinks = context.querySelectorAll('[data-drupal-link-system-path].is-active');
        var il = activeLinks.length;
        for (var i = 0; i < il; i++) {
          activeLinks[i].classList.remove('is-active');
        }
      }
    }
  };
})(Drupal, drupalSettings);;
/*
 * @file antheprofile.js
 * Contains all functionality related to anthe profile module
 */
(function (Drupal, $) {
    'use strict';

    Drupal.behaviors.anthe_profile = {
        attach: function (context, settings) {
        }
    };

})(Drupal, jQuery);

(function ($) {
    $(document).ready(function () {
      var check = $('#profile-text .quicktabs-tabpage .views-field-field-user-cbt-centre div.field-content');
      if ($.trim(check.text()) != '') {
        check.after('<div style="color: green;font-size: 12px;line-height: 1;padding-top: 5px;padding-left: 7em;">Seat Booked</div>');
      }
  
        $('.field--name-field-user-exam-centre').css('display', 'none');
        $('.field--name-field-user-cbt-centre').css('display', 'none');
        // Profile tab block
        $('body').on('click', '.profile-tab a', function (e) {
            e.preventDefault();
            $('.profile-tab li').removeClass('active');
            $(this).parent().addClass('active');
            $($(this).attr('href')).show();
            $($(this).attr('href')).siblings('.form-field').hide();
        });

        // When user clicks cancel while completing profile.
        $(".cancel").click(function () {
            var retVal = confirm("Are You sure, You want to cancel ? Your changes will be lost!");
            if (retVal == true) {
                window.location.href = "/profile";
            } else {
                return false;
            }
        });
        // popup on mockup paper on profile
        $(".openMockPopup").click(function(e) {
            var id = $(this).attr('href');
            e.preventDefault();
            $(id).dialog({
                resizable: false,
                height: 300,
                width: 500,
                modal: true,
                open: function() {
                    $(this).closest(".ui-dialog")
                    .find(".ui-dialog-titlebar-close")
                    .html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
                }
            });
            return false;
        });

        $html = '';
        $("#edit-payment-gateway .form-radio").each(function() {
            $paymentmode = $(this).val();
            if ($paymentmode == 'hdfc') {
                $html += '<div class="js-form-item form-item js-form-type-radio form-item-payment-gateway js-form-item-payment-gateway"><input class="payment-form-wrapper form-radio" data-drupal-selector="edit-payment-gateway-hdfc" type="radio" id="edit-payment-gateway-hdfc" name="payment_gateway" value="hdfc"><label for="edit-payment-gateway-hdfc" class="option"><img src="/themes/anthe/images/html-images/hdfc.png"></label></div>';
            }
            
            if ($paymentmode == 'payumoney') {
                $html += '<div class="js-form-item form-item js-form-type-radio form-item-payment-gateway js-form-item-payment-gateway"><input class="payment-form-wrapper form-radio" data-drupal-selector="edit-payment-gateway-payumoney" type="radio" id="edit-payment-gateway-payumoney" name="payment_gateway" value="payumoney"><label for="edit-payment-gateway-payumoney" class="option"><img src="/themes/anthe/images/html-images/payu.jpg"></label></div>';
            }
            
            if ($paymentmode == 'paytm') {
                $html += '<div class="js-form-item form-item js-form-type-radio form-item-payment-gateway js-form-item-payment-gateway"><input class="payment-form-wrapper form-radio" data-drupal-selector="edit-payment-gateway-paytm" type="radio" id="edit-payment-gateway-paytm" name="payment_gateway" value="paytm"><label for="edit-payment-gateway-paytm" class="option"><img src="/themes/anthe/images/html-images/paytm.png"></label></div>';
            }
        });
        $("#edit-payment-gateway").html($html);
    });

})(jQuery);;
var webengage_init_key = drupalSettings.anthe_webengage.webengage_init_key;
var Ga_examType = window.location.pathname.split('/')[1];

! function(e) {
    e(document).ready(function() {
        "login" === drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key), 
        webengage.user.login(drupalSettings.anthe_webengage_we_user_id), 
        webengage.user.setAttribute("we_phone", drupalSettings.anthe_webengage_we_phone), 
        set_cookie("anthe_webengage_we_user_id", 
        drupalSettings.anthe_webengage_we_user_id, 365),
        webengage.track("Login", {
            user_id: drupalSettings.anthe_webengage_we_user_id,
            pageHostName: window.location.hostname,
            pagePath: document.location.pathname
        }), 
        console.log("Webengage Signin Submit"), 
        console.log(drupalSettings.anthe_webengage_we_user_id), 
        console.log(drupalSettings.anthe_webengage_we_phone)), 
        "true" === drupalSettings.admitcard_download && e("#block-anthe-content .genpdf").click(function() {
            dataLayer.push({
                event: "AdmitCard Download",
                user_id: get_cookie("anthe_webengage_we_user_id"),
                exam_type: drupalSettings.admitcard_exam_type,
                pageHostName: window.location.hostname,
                pagePath: document.location.pathname
            }), 
            console.log("AdmitCard Download"), 
            console.log(drupalSettings.admitcard_exam_type)
        })
         // Session Start event for webengage
           
         "signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
        //  webengage.user.logout(),
         webengage.track(drupalSettings.anthe_webengage_exam_type+"_1_Session_Start", {
             exam_type: drupalSettings.anthe_webengage_exam_type,
             pageHostName: window.location.hostname,
             pagePath: document.location.pathname
         }),
         erase_cookie("step_3_verify_otp"),
         erase_cookie("step_4_personal_info"),
         erase_cookie("anthe_webengage_we_user_id"),
         console.log(drupalSettings.anthe_webengage_exam_type+"_1_Session_Start"),
         console.log("pageHostName =="+" "+window.location.hostname),
         console.log("pagePath =="+" "+document.location.pathname),
         console.log("exam_type =="+" "+drupalSettings.anthe_webengage_exam_type)
       )

        //Multistep ANTHE/AKTHE/IACST Form GET OTP
        "signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
        e("a.global-otp-verify").click(function() {
            var mobile_no = jQuery('#edit-mobile-no').val();
                if ( mobile_no>= 10 && webengage.init(webengage_init_key)) {
                    webengage.user.setAttribute("we_phone", mobile_no),
                    webengage.track(drupalSettings.anthe_webengage_exam_type+"_2_Get_OTP", {
                      user_mobile: mobile_no,
                      exam_type: drupalSettings.anthe_webengage_exam_type,
                      pageHostName: window.location.hostname,
                      pagePath: document.location.pathname
                  });
                  console.log(drupalSettings.anthe_webengage_exam_type+"_2_Get_OTP");
               }
        }),
        drupalSettings.anthe_webengage_form_name = ""
        )

         //STEP 0 SINGLE STEP ANTHE/AKTHE/IACST
         "sp_signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
         webengage.track(drupalSettings.anthe_webengage_exam_type+"_SS_1_Session_Start", {
             pageHostName: window.location.hostname,
             pagePath: document.location.pathname,
             exam_type: drupalSettings.anthe_webengage_exam_type,
         }),
         erase_cookie("Intent_To_Reg"),
         console.log("pagePath =="+" "+document.location.pathname),
         console.log(drupalSettings.anthe_webengage_exam_type+"_SS_1_Session_Start"),
         console.log("Exam type"+" "+drupalSettings.anthe_webengage_exam_type)
         ),
         //Get OTP SINGLE STEP

         "sp_signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
         jQuery("a.global-otp-verify").click(function() {
         var mobile_no = jQuery('#edit-mobile-no').val();
             if ( mobile_no>= 10 && webengage.init(webengage_init_key)) {
               webengage.track(drupalSettings.anthe_webengage_exam_type+"_SS_2_Get_OTP", {
                   user_mobile: mobile_no,
                   exam_type: drupalSettings.anthe_webengage_exam_type,
                   pageHostName: window.location.hostname,
                   pagePath: document.location.pathname
               });
               console.log(drupalSettings.anthe_webengage_exam_type+"_SS_2_Get_OTP");
            }
     }),
     drupalSettings.anthe_webengage_form_name = ""
     )

    })
}(jQuery),
function(e,a) {
    "use strict";
    e.behaviors.anthe_webengage = {
        attach: function(e) {

            // Verify OTP event for webengage
            "signup_step_one" == drupalSettings.anthe_webengage_form_name && (get_cookie("step_3_verify_otp") == null) && (webengage.init(webengage_init_key), 
             webengage.user.login(drupalSettings.anthe_webengage_we_user_id), 
             webengage.user.setAttribute("we_phone", drupalSettings.anthe_webengage_we_phone), 
            set_cookie("anthe_webengage_we_user_id", 
            drupalSettings.anthe_webengage_we_user_id, 365), 
           
            webengage.track(drupalSettings.anthe_webengage_exam_type+"_3_Verify_OTP", {
                user_id: drupalSettings.anthe_webengage_we_user_id,
                exam_type: drupalSettings.anthe_webengage_exam_type,
                pageHostName: window.location.hostname,
                pagePath: document.location.pathname
            }), 
             set_cookie("step_3_verify_otp", "true", 365),
             console.log(drupalSettings.anthe_webengage_exam_type+"_3_Verify_OTP"),
             drupalSettings.anthe_webengage_form_name = ""),

            // Personal Info event for webengage
            
            "signup_step_two" == drupalSettings.anthe_webengage_form_name && (get_cookie("step_4_personal_info") == null) && (webengage.init(webengage_init_key),
            dataLayer.push({'event':Ga_examType+'_select_exam_date'
            }), 
             webengage.user.setAttribute("we_first_name", drupalSettings.anthe_webengage_we_first_name),
             webengage.user.setAttribute("we_email", drupalSettings.anthe_webengage_email,),
             webengage.track(drupalSettings.anthe_webengage_exam_type+"_4_Personal_Info", {
                user_id: drupalSettings.anthe_webengage_we_user_id,
                we_first_name: drupalSettings.anthe_webengage_we_first_name,
                exam_class: drupalSettings.anthe_webengage_class,
                exam_stream: drupalSettings.anthe_webengage_stream,
                exam_mode: drupalSettings.anthe_webengage_exam_mode,
                exam_time: drupalSettings.anthe_webengage_exam_time,
                exam_state: drupalSettings.anthe_webengage_state,
                exam_prefrred_center: drupalSettings.anthe_webengage_prefrred_center,
                we_email: drupalSettings.anthe_webengage_email,
                exam_type: drupalSettings.anthe_webengage_exam_type,
                pageHostName: window.location.hostname,
                pagePath: document.location.pathname
            }),
            dataLayer.push({
                'event': drupalSettings.anthe_webengage_exam_type+'_registration_step1_EC',
                'student_name':drupalSettings.anthe_webengage_we_first_name,
                'email_id':drupalSettings.anthe_webengage_email,
            }),
            invokeLsClickRegisterEvent(),
            setTimeout(applyCouponAuto, 1000),
            set_cookie("step_4_personal_info", "true", 365),
            console.log(drupalSettings.anthe_webengage_exam_type+"_4_Personal_Info"),
            console.log(drupalSettings.anthe_webengage_we_user_id), 
            console.log(drupalSettings.anthe_webengage_we_first_name), 
            console.log(drupalSettings.anthe_webengage_class), 
            console.log(drupalSettings.anthe_webengage_stream), 
            console.log(drupalSettings.anthe_webengage_exam_mode), 
            console.log(drupalSettings.anthe_webengage_exam_time), 
            console.log(drupalSettings.anthe_webengage_state), 
            console.log(drupalSettings.anthe_webengage_prefrred_center), 
            console.log(drupalSettings.anthe_webengage_email), 
            console.log(drupalSettings.anthe_webengage_exam_type), 
            drupalSettings.anthe_webengage_form_name = ""
            ),
            // Complete Registration event for webengage
            "true" == get_cookie("proceed_for_checkout") && (null !== get_cookie("anthe_webengage_we_user_id")) && (webengage.init(webengage_init_key),
             //Complete Registration Event
             dataLayer.push({'event':Ga_examType+'_complete_reg'
             }),
                webengage.track(drupalSettings.anthe_webengage_exam_type+"_5_Complete_Registration", {
                user_id: get_cookie("anthe_webengage_we_user_id"),
                exam_type: drupalSettings.anthe_webengage_exam_type,
                pageHostName: window.location.hostname,
                pagePath: document.location.pathname
            }),
            invokeLsPayFeeEvent(),
            erase_cookie("anthe_webengage_ls_exam_date"),
            erase_cookie("proceed_for_checkout"),
             console.log("user id - "+drupalSettings.anthe_webengage_we_user_id),
             console.log(drupalSettings.anthe_webengage_exam_type+"_5_Complete_Registration")),

            // "true" == get_cookie("proceed_for_checkout") && (null !== get_cookie("anthe_webengage_we_user_id") && dataLayer.push({
            //     event: "Proceed for Payment",
            //     user_id: get_cookie("anthe_webengage_we_user_id"),
            //     pageHostName: window.location.hostname,
            //     pagePath: document.location.pathname
            // }),
            // invokeLsPayFeeEvent(),
            // erase_cookie("anthe_webengage_ls_exam_date"),
            // erase_cookie("proceed_for_checkout"),
            // console.log("Proceed for Payment")
            // ),

        
            // Single Page Registration
           
            //STEP 1

            "sp_signup_step_one" == drupalSettings.anthe_webengage_form_name && null == get_cookie("Intent_To_Reg") && (webengage.init(webengage_init_key), 
            webengage.user.login(drupalSettings.anthe_webengage_we_user_id), 
            webengage.user.setAttribute("we_phone", drupalSettings.anthe_webengage_we_phone), 
            set_cookie("anthe_webengage_we_user_id", 
            drupalSettings.anthe_webengage_we_user_id, 365), 
            webengage.track(drupalSettings.anthe_webengage_exam_type+"_SS_3_Verify_OTP", {
                user_id: drupalSettings.anthe_webengage_we_user_id,
                exam_type: drupalSettings.anthe_webengage_exam_type,
                pageHostName: window.location.hostname,
                pagePath: document.location.pathname
            }), 
             set_cookie("Intent_To_Reg", true, 1),
             console.log(drupalSettings.anthe_webengage_we_user_id),
             //console.log(drupalSettings.anthe_webengage_we_user_id), 
             //console.log(drupalSettings.anthe_webengage_we_phone),
             console.log(drupalSettings.anthe_webengage_exam_type), 
             //console.log("pagePath==="),
             //console.log("pageHostName==="),
             //invokeLsClickRegisterEvent(),
             console.log(drupalSettings.anthe_webengage_exam_type+"_SS_3_Verify_OTP"), 
             drupalSettings.anthe_webengage_form_name = ""),

             //STEP FINAL
            "sp_signup_step_final" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key), 
            dataLayer.push({'event':Ga_examType+'_complete_reg'
             }),
             webengage.user.setAttribute("we_first_name", drupalSettings.anthe_webengage_we_first_name),
             webengage.user.setAttribute("we_email", drupalSettings.anthe_webengage_email),
             webengage.track(drupalSettings.anthe_webengage_exam_type+"_SS_4_Complete_Registration", {
                user_id: drupalSettings.anthe_webengage_we_user_id,
                we_first_name: drupalSettings.anthe_webengage_we_first_name,
                exam_class: drupalSettings.anthe_webengage_class,
                exam_stream: drupalSettings.anthe_webengage_stream,
                exam_mode: drupalSettings.anthe_webengage_exam_mode,
                exam_time: drupalSettings.anthe_webengage_exam_time,
                exam_state: drupalSettings.anthe_webengage_state,
                exam_prefrred_center: drupalSettings.anthe_webengage_prefrred_center,
                we_email: drupalSettings.anthe_webengage_email,
                exam_type: drupalSettings.anthe_webengage_exam_type,
                pageHostName: window.location.hostname,
                pagePath: document.location.pathname
            }),
            erase_cookie("anthe_webengage_ls_exam_date"),
            console.log(drupalSettings.anthe_webengage_we_user_id), 
            console.log(drupalSettings.anthe_webengage_we_first_name), 
            console.log(drupalSettings.anthe_webengage_class), 
            console.log(drupalSettings.anthe_webengage_stream), 
            console.log(drupalSettings.anthe_webengage_exam_mode), 
            console.log(drupalSettings.anthe_webengage_exam_time), 
            console.log(drupalSettings.anthe_webengage_state), 
            console.log(drupalSettings.anthe_webengage_prefrred_center), 
            console.log(drupalSettings.anthe_webengage_email), 
            console.log(drupalSettings.anthe_webengage_exam_type), 
            console.log(drupalSettings.anthe_webengage_exam_type+"_SS_4_Complete_Registration"), 
            drupalSettings.anthe_webengage_form_name = ""
            )
        }
    }
}(Drupal, jQuery),
function(e) {
    e(window).on("load", function() {
        e("div").hasClass("payment-form-success-wrapper") && (null !== get_cookie("anthe_webengage_we_user_id") && dataLayer.push({
            event: "Payment Sucess",
            user_id: get_cookie("anthe_webengage_we_user_id"),
            pageHostName: window.location.hostname,
            pagePath: document.location.pathname
        }),
        invokeLsIacstRegister(),
        erase_cookie("apps_flayer_ls_event_class"),
        erase_cookie("apps_flayer_ls_event_stream"),
        erase_cookie("apps_flayer_ls_event_exam_date"),
        console.log("Payment Sucess"), 
        console.log(window.location.hostname), 
        console.log(document.location.pathname)), 
        e("div").hasClass("payment-failed-wrapper") && (null !== get_cookie("anthe_webengage_we_user_id") && dataLayer.push({
            event: "Payment Sucess",
            user_id: get_cookie("anthe_webengage_we_user_id"),
            pageHostName: window.location.hostname,
            pagePath: document.location.pathname
        }), 
        console.log("Payment Failed"), 
        console.log(window.location.hostname), 
        console.log(document.location.pathname))
    })
}(jQuery);

/**
 * Implementation of Form Step 2 click
 * @returns {undefined}
 */
function invokeLsClickRegisterEvent() {
 var userId = drupalSettings.anthe_webengage_we_phone;
 try {
    AndroidInterface.postMessage(JSON.stringify({
      name: 'apps_flyer_event',
      body: {
          "event_name" : "init_iacst_register",
          "params": {

           }
      }
    }));
 } catch (err){
    console.log(err.message);
 }
 
try {
    window.webkit.messageHandlers.eventHandler.postMessage(JSON.stringify({
        name: 'apps_flyer_event',
        body: {
          "event_name" : "init_iacst_register",
          "params": {

           }
        }
    }));
    } catch (err){
        console.log(err.message);
    }
 var jsonData = JSON.stringify({
      name: 'apps_flyer_event',
      body: {
          "event_name" : "init_iacst_register",
          "params": {
              "userId":userId
           }
      }
    });
    callAjaxSaveLog(jsonData, userId);
}

/**
 * Implementation of LS Pay Fee Event
 * @returns {undefined}
 * 
 */
function invokeLsPayFeeEvent() {
 var classValue = drupalSettings.anthe_webengage_ls_class;
 var streamValue = drupalSettings.anthe_webengage_ls_stream;
 var examDate = get_cookie("anthe_webengage_ls_exam_date");
 var userId = drupalSettings.anthe_webengage_we_phone;
 try {
    AndroidInterface.postMessage(JSON.stringify({
      name: 'apps_flyer_event',
      body: {
          "event_name" : "init_iacst_payment",
          "params": {
              "class"  : classValue,
              "stream" : streamValue,
              "slots"  : examDate
           }         
      }
    }));
 } catch (err){
    console.log(err.message);
 }
 
try {
    window.webkit.messageHandlers.eventHandler.postMessage(JSON.stringify({
        name: 'apps_flyer_event',
        body: {
            "event_name" : "init_iacst_payment",
            "params": {
                "class"  : classValue,
                "stream" : streamValue,
                "slots"  : examDate
             }         
        }
    }));
    } catch (err){
        console.log(err.message);
    } 
 var jsonData = JSON.stringify({
      name: 'apps_flyer_event',
      body: {
          "event_name" : "init_iacst_payment",
          "params": {
              "class"  : classValue,
              "stream" : streamValue,
              "slots"  : examDate,
              "payment": "initiate"
           }         
      }
    }); 
 callAjaxSaveLog(jsonData, userId);
}

/**
 * Implementation of LS Pay Fee Event
 * @returns {undefined}
 */ 
function invokeLsIacstRegister() {
 var classValue = get_cookie("apps_flayer_ls_event_class");
 var streamValue = get_cookie("apps_flayer_ls_event_stream");
 var examDate = get_cookie("apps_flayer_ls_event_exam_date");
 var userId = get_cookie("anthe_webengage_we_user_id");

 const classValueArr = classValue.split("+");
 if(classValueArr.length > 0) {
     classValue = classValueArr.join(' ');
 }
 
 try {
    AndroidInterface.postMessage(JSON.stringify({
      name: 'apps_flyer_event',
      body: {
          "event_name" : "fin_iacst_register",
          "params": {
              "class"  : classValue,
              "stream" : streamValue,
              "slots"  : examDate
           }         
      }
    }));
 } catch (err){
    console.log(err.message);
 }
 
try {
    window.webkit.messageHandlers.eventHandler.postMessage(JSON.stringify({
        name: 'apps_flyer_event',
        body: {
            "event_name" : "fin_iacst_register",
            "params": {
                "class"  : classValue,
                "stream" : streamValue,
                "slots"  : examDate
             }         
        }
    }));
    } catch (err){
        console.log(err.message);
    } 
 var jsonData = JSON.stringify({
      name: 'apps_flyer_event',
      body: {
          "event_name" : "fin_iacst_register",
          "params": {
              "class"  : classValue,
              "stream" : streamValue,
              "slots"  : examDate,
              "payment": "done"
           }         
      }
    }); 
 callAjaxSaveLog(jsonData, userId);
}

/**
 * Implementation of Call Ajax Save Log
 * @returns {undefined}
 */
function callAjaxSaveLog(jsonData, userId) {
    console.log('userIdVal=='+userId);
    jQuery.ajax({
        type: "POST",
        cache: false,
        url: drupalSettings.path.baseUrl + "ls-apps-flayer-event",
        data: {data : jsonData, userId: userId},
        beforeSend: function() {

        },
        success: function(data){

        }
    });    
}

/**
 * Implementation of Coupon Auto click
 * @returns {undefined}
 */
function applyCouponAuto() {
    try {
        var coupon = drupalSettings.coupon_code_value;
        var bool_pg_skip = get_cookie("bool_pg_skip");
        if (coupon && (bool_pg_skip == "FALSE")) {
            jQuery('#edit-apply-coupon').click();
            jQuery('#edit-apply-coupon').hide();
        }
    } catch (err){
        //console.log(err.message);
    }
}



//GA4 EVENTS

jQuery(document).ready(function($) {
   
    //Get OTP Event
    $('#form-wrapper > div.mobile-wrapper > div.otp-wrapper > a').on('click',function(){
        if($("input[id='edit-mobile-no']").val().length == 10){
            dataLayer.push({'event':Ga_examType+'_get_otp'
            });
        }
    });

    //EXAM DATE SELECTION EVENT

    //Login Click Event
    $('#form-wrapper > div.already-registered > a').on('click',function(){
        dataLayer.push({'event':'login_now_click'
        });
    });

    //LOGO CLICK EVENT
    $('#block-anthe-content > article > section.banner-main-wrapper > div > div:nth-child(1) > div > a.logotop > img,#topheader > div > div > div.col-md-4.col-sm-4.pull-left > img').on('click',function(){
        dataLayer.push({'event':'aakash_logo_click'
        });
    });


})

// WEBENGAGE Event

jQuery(document).ready(function($) {
    if(window.location.host == 'iacst.aakash.ac.in'){
        
    $('#block-dashboardmenu--3 > ul > li > a').on('click',function(){
        webengage.init(webengage_init_key);
        webengage.track('iacst_db_tab_'+ $(this).text() + '_click');
        console.log('iacst_db_tab_'+ $(this).text() + '_click');
    });

    



    $('#edit-user-rollnumber').on('input',function(){
        var roll = $('#edit-user-rollnumber').val();
        if($(this).val().length ===12){
            $('#edit-user-dob').click(function(){
                webengage.init(webengage_init_key);
                webengage.track("iacst_login_roll_entered",{
                    user_rollnumber: roll,
                });
                console.log(roll);
            });
        }
    });

    $('#edit-user-dob').change(function(){
        var dob = $(this).val();
       
        if(dob.length ===10){
            webengage.init(webengage_init_key);
            webengage.track("iacst_login_DOB_entered",{
                user_dob: dob,
            });   
            console.log(dob);         
        }
    });

    $('#edit-submit').on('click',function(){
        webengage.init(webengage_init_key);
        webengage.track("iacst_login_signin",{});
        console.log('iacst_login_signin');
        
    });

    "login" === drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
    webengage.track("iacst_login_success", {
        user_rollnumber : drupalSettings.anthe_webengage_roll_no,
        user_dob: drupalSettings.anthe_webengage_dob,
    }),
    console.log("iacst_login_success"),
    console.log( drupalSettings.anthe_webengage_roll_no),
    console.log( drupalSettings.anthe_webengage_dob))


    $(document).ready(function() {
        
        if (window.location.pathname=='/exam/login') {
            var dob = localStorage.getItem('dob');
            $('#edit-submit').on('click',function(){
            dob = $('#edit-user-dob').val();
            localStorage.setItem('dob', dob);
        });
                var roll = $('#edit-user-rollnumber').val();
                checkForErrorMessage(roll,dob);
            }
        
      });
    function checkForErrorMessage(roll,dob) {
        var errorMessage = $('.messages.messages--error div[role="alert"]');
        if (errorMessage.length > 0) {
            webengage.init(webengage_init_key);
            webengage.track("iacst_login_invalid_credentials", {
                            user_rollnumber : roll,
                            user_dob: dob,
                     }),
            console.log("iacst_login_invalid_credentials");
            console.log(roll);
            console.log(dob);
        }
      }
    }
    
})

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  function mapTextContentToAjaxResponse(content) {
    if (content === '') {
      return false;
    }

    try {
      return JSON.parse(content);
    } catch (e) {
      return false;
    }
  }

  function bigPipeProcessPlaceholderReplacement(index, placeholderReplacement) {
    var placeholderId = placeholderReplacement.getAttribute('data-big-pipe-replacement-for-placeholder-with-id');
    var content = this.textContent.trim();

    if (typeof drupalSettings.bigPipePlaceholderIds[placeholderId] !== 'undefined') {
      var response = mapTextContentToAjaxResponse(content);

      if (response === false) {
        $(this).removeOnce('big-pipe');
      } else {
        var ajaxObject = Drupal.ajax({
          url: '',
          base: false,
          element: false,
          progress: false
        });

        ajaxObject.success(response, 'success');
      }
    }
  }

  var interval = drupalSettings.bigPipeInterval || 50;

  var timeoutID = void 0;

  function bigPipeProcessDocument(context) {
    if (!context.querySelector('script[data-big-pipe-event="start"]')) {
      return false;
    }

    $(context).find('script[data-big-pipe-replacement-for-placeholder-with-id]').once('big-pipe').each(bigPipeProcessPlaceholderReplacement);

    if (context.querySelector('script[data-big-pipe-event="stop"]')) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      return true;
    }

    return false;
  }

  function bigPipeProcess() {
    timeoutID = setTimeout(function () {
      if (!bigPipeProcessDocument(document)) {
        bigPipeProcess();
      }
    }, interval);
  }

  bigPipeProcess();

  $(window).on('load', function () {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    bigPipeProcessDocument(document);
  });
})(jQuery, Drupal, drupalSettings);;
/*
 * @file anthedate.js
 * Contains all functionality related to anthe profile module
 */
(function(Drupal, $) {
    'use strict';

    Drupal.behaviors.anthe_profile = {
        attach: function(context, settings) {

            var start_date = drupalSettings.start_date;
            var end_date = drupalSettings.end_date;
            var start_year = drupalSettings.start_year;
            var end_year = drupalSettings.end_year;

            if (start_date && end_date && start_year && end_year) {
                if (jQuery('#date').length) {
                    jQuery('#date, .form-date').datepicker({
                        dateFormat: 'dd/mm/yy',
                        changeMonth: true,
                        changeYear: true,
                        minDate: new Date(start_date),
                        maxDate: new Date(end_date),
                        yearRange: start_year + ":" + end_year,
                        defaultDate: '01/01/2008',
                    });
                }
                if (jQuery('.form-date').length) {
                    jQuery('#date, #edit-field-user-date-of-birth-0-value-date').datepicker({
                        dateFormat: 'yy-mm-dd',
                        changeMonth: true,
                        changeYear: true,
                        minDate: new Date(start_date),
                        maxDate: new Date(end_date),
                        yearRange: start_year + ":" + end_year,
                    });
                    // changing date format for login page
                    jQuery('#date, #edit-user-dob').datepicker({
                        dateFormat: 'dd-mm-yy',
                        changeMonth: true,
                        changeYear: true,
                        minDate: new Date(start_date),
                        maxDate: new Date(end_date),
                        yearRange: start_year + ":" + end_year,
                    }).attr('readonly','true');
                    
                }


            }

            jQuery('#edit-user-dob').datepicker({
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                minDate: new Date(start_date),
                maxDate: new Date(end_date),
                yearRange: start_year + ":" + end_year,
                constrainInput: false,
            });
            
            jQuery("#edit-user-dob").keydown(function (e) {
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                    // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
                var a = (jQuery(this).val());
                if(a.length == 2 || a.length == 5) {
                    jQuery(this).val(a+'-');
                }
            });

            jQuery('#edit-dob').datepicker({
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                minDate: new Date(start_date),
                maxDate: new Date(end_date),
                yearRange: start_year + ":" + end_year,
            });
            $('#edit-user-rollnumber').keyup(function() {
                var check_email_field_exists = $('#sch-student-email-wrapper .sch-student-email').length;
                console.log(check_email_field_exists);
                if (check_email_field_exists) {
                    $(".sch-student-email").css('display', 'none');
                    $(".sch-student-phone").css('display', 'none');
                    $(".form-item-user-dob").css('display', 'none');
                    $("#resend-edit-check-roll").css('display', 'none');
                    $("#edit-check-roll").removeClass('visually-hidden');
                    $("#submit-exam-pwd").css('display', 'none');
                    $("#result-message .messages__wrapper .messages").html('');
                }
            });

            $("#edit-dob").change(function() {
                if ($('#submit-exam-pwd').css('display') == 'none') {
                    $("#submit-exam-pwd").css('display', 'block');
                }
            });
        },

    };

})(Drupal, jQuery);

(function($) {
    $(document).ready(function() {
        //
    });


})(jQuery);;