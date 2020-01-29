$(document).ready(function() {
  const maxCount = $(".counter.tweet-btn").html();

  $(".text-input-tweet").on("keyup", function() {
    if ($(this).val().length >= 0) {
      let count = maxCount - this.value.length;
      $(this).next().find(".counter").html(count)
    }

    if (this.value.length >= maxCount) {
      $(this).next().find(".counter.tweet-btn").addClass("red");
    } else {
      $(this).next().find(".counter.tweet-btn").removeClass("red");
    }
  });
});