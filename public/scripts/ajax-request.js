
$(document).ready(function() {
  
  $('.form-tweet').on('submit', function() {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
    }).then(function(msg) {
      alert("Data saved: " + msg)
    })
    // userData = $(this).find('textarea').val();
    // console.log($(this).serialize())
  })
})

