$(document).ready(function() {

  $('.user-tag').hide();
  
  $(".tweet-container").hover(function () {
    $(this).find('.user-tag').show();
    $(this).css("font-weight", "700");
    $(this).css("box-shadow", "5px 10px #86a1bb");
  }, function () {
    $(this).find('.user-tag').hide();
    $(this).css("font-weight", "300");
    $(this).css("box-shadow", "");
  })
})