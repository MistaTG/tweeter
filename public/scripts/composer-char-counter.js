$(document).ready(function() {
  const maxCount = $(".form-counter").html();

  $(".form-input").on("keyup", function() {
    const formCounter = $(this).siblings('.form-counter');

    if ($(this).val().length >= 0) {
      let count = maxCount - this.value.length;
      formCounter.html(count)
    }

    if (this.value.length >= maxCount) {
      formCounter.addClass("red");
    } else {
      formCounter.removeClass("red");
    }
  });
});