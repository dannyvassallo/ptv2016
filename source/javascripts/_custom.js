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
