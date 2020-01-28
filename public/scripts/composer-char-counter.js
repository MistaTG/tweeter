$(document).ready(function() {
  const maxCount = $(".counter.tweet-btn").html();

  $(".text-input-tweet").on("keyup", function() {
    if (this.value.length >= 0) {
      let count = maxCount - this.value.length;
      $(".counter.tweet-btn").html(count);
    }

    if (this.value.length >= maxCount) {
      $(".counter.tweet-btn").addClass("red");
    } else {
      $(".counter.tweet-btn").removeClass("red");
    }
  });
});