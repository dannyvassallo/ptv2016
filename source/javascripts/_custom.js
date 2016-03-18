// iterate through errors and growl them
function toasts(){
  setTimeout(function(){
    $('span.error').each(function(){
      if($(this).html() != ""){
        var errorText = $(this).text();
        Materialize.toast(errorText, 5000, 'red');
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
  tornPaperMarginR();
  tornPaperMarginL();
});

$(window).resize(function(){
  tornPaperMarginR();
  tornPaperMarginL();
});

function tornPaperMarginR(){
  var screenW = $(window).width(),
  elWidth = $('.torn-paper').width(),
  margin = ((screenW / 2) - elWidth)+ 80;
  $('.torn-paper').css('right', margin);
  $('.torn-paper').height($('body').height());
}

function tornPaperMarginL(){
  var screenW = $(window).width(),
  elWidth = $('.torn-paper-l').width(),
  albumImage = $('.album-img').width();
  if(screenW < 1335){
    diff = 50;
  }else if(screenW < 1670){
    diff = 70;
  }else{
    diff = 150;
  }
  margin = (((screenW / 2) - elWidth)- diff) - (albumImage / 2);
  $('.torn-paper-l').css('left', margin);
  $('.torn-paper-l').height($('body').height());
}

var regEmailAction = "https://docs.google.com/a/trendsettermarketing.net/forms/d/1cnCJZ5PssQxDzCihYcHQJj2LRd3B_QcwCLzZ8CPBATI/formResponse";
var streetTeamAction = "https://docs.google.com/a/trendsettermarketing.net/forms/d/1QxqmwU2hgPZgyDqLSHr_URKNoaE-mhCOPRjojr8FeGc/formResponse";

$(function(){
  $("#street-team").change(function() {
    if($(this).prop('checked') !== true){
      $("#email-form").attr("action", regEmailAction);
    } else {
      $("#email-form").attr("action", streetTeamAction);
    }
  });
});
