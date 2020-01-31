$(document).ready(function() {

  // Get the maxnumber of characters allowed
  const maxCount = $(".form-counter").html();

  // Catch the keyup event and have the counter count down/turn red
  $(".form-input").on("keyup", function() {
    const formCounter = $(this).siblings('.form-counter');

    if ($(this).val().length >= 0) {
      let count = maxCount - this.value.length;
      formCounter.html(count);
    }

    if (this.value.length >= maxCount) {
      formCounter.addClass("red");
    } else {
      formCounter.removeClass("red");
    }
  });
});