$(document).ready(function() {
  
  $('.form-tweet').on('submit', function() {
    event.preventDefault();
    const userData = $(this).find('textarea').val();
    const dataLength = String(userData).length;
    const errContainer = $(this).parent().prev();
    // Need to pull out sliding logic out of here
    errContainer.slideUp();

    if (dataLength === 0) {
      errContainer.slideDown({complete: function() {
        if (errContainer.children()[0].textContent !== '') {
          errContainer.children().empty();
        }
        if (errContainer.children()[0].textContent === '') {
          errContainer.children().append("Please enter a tweet")
        }
      }})
    } else if (dataLength <= 140) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize(),
      }).then(function(msg) {
        $.ajax('/tweets', {method: 'GET'})
        .then(function(data){
          renderTweets([data[data.length - 1]]);
        })
        errContainer.children().empty();
        $('textarea').val('');
        // console.log(this)
      })
    } else {
      errContainer.slideDown({complete: function() {
        if (errContainer.children()[0].textContent !== '') {
          errContainer.children().empty();
        }
        if (errContainer.children()[0].textContent === '') {
          errContainer.children().append("Please keep your tweet to below 140 characters")
        }
      }})
    }
  })
})

