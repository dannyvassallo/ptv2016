function resizeGradient(){
  var videoH = $('.video').height();
  var gradient = $('.gradient');
  gradient.height(videoH);
  var newMargin = videoH - 5;
  var cssMargin = "-"+newMargin+"px";
  gradient.css('margin-top',cssMargin);
}

$(function(){
  resizeGradient();
});

$(window).resize(function(){
  resizeGradient();
});

// iterate through errors and growl them
function toasts(){
  setTimeout(function(){
    $('span.error').each(function(){
      if($(this).html() != ""){
        var errorText = $(this).text();
        Materialize.toast(errorText, 4000, 'red');
      }
    });
  }, 100);
}

// successMsg Constructor
var successMsg = "<div id=\"thankyou\" class=\"col-xs-12 black-text\"><h2 class=\"thanks\">Thank you for entering!</h2></div>";


$("#email-form").validate({
  ignore: "",
  focusInvalid: false,
  rules: {
    'entry.2137816727': {
      required: {
        depends:function(){
          $(this).val($.trim($(this).val()));
          return true;
        }
      },
      email: true
    }
  },
  messages: {
    'entry.2137816727': {
      required: "Please enter your email address.",
    }
  },
  invalidHandler: function(form, validator) {
    toasts();
  },
  success: "valid",
  submitHandler: function(form) {
    form.submit();
    setTimeout(function(){
      $('form input').val('');
      $('form input').focus();
      $('form input').blur();
    }, 500);
    Materialize.toast("Thanks for your entry!", 4000, 'green');
  },
  errorElement : 'span',
  errorPlacement: function (error, element) {
    var elementId = element[0].id;
    if(elementId == 'fbshareinput' || elementId == 'tour-input'){
      error.insertAfter($('#'+elementId).next('.error-box'));
    } else {
      error.insertAfter($(element).parent().next('.error-box'));
    }
  }
});


$(function(){
  $('form label').on('click', function(){
    $(this).prev('input').focus();
  });
});
