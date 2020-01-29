
$(document).ready(function() {
  
  $('.form-tweet').on('submit', function() {
    event.preventDefault();
    const userData = $(this).find('textarea').val();
    const dataLength = String(userData).length;
    console.log(dataLength)

    if (dataLength === 0) {
      alert('Please enter a tweet');
    } else if (dataLength <= 140) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize(),
      }).then(function(msg) {
        alert("Data saved: " + msg)
      })
    } else {
      alert('Please keep your tweet to below 140 characters')
    }
    // console.log($(this).serialize())
  })
})

