$(document).ready(function() {
  
  $('.form-tweet').on('submit', function() {
    // Prevent the usual logic that happens on a submit
    event.preventDefault();
    
    // Variables to get the Data the users entering, and the Error container
    const userData = $(this).find('textarea').val();
    const dataLength = String(userData).length;
    const errContainer = $(this).parent().prev();

    errContainer.slideUp();

    if (dataLength === 0) {
      // If theres no data then slide down the error container
      errContainer.slideDown({complete: function() {
        if (errContainer.children()[0].textContent !== '') {
          errContainer.children().empty();
        }
        if (errContainer.children()[0].textContent === '') {
          errContainer.children().append("Please enter a tweet");
        }
      }});
    } else if (dataLength <= 140) {
      // If there is then do an ajax post request to add the data, and do a ajax get request to add it back to the page without refreshing
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize(),
      }).then(function(msg) {
        $.ajax('/tweets', {method: 'GET'})
          .then(function(data) {
            renderTweets([data[data.length - 1]]);
          });
        errContainer.children().empty();
        $('textarea').val('');
        $('.form-counter').html(140);
      });
    } else {
      // If there is over 140 characters then drop the error container again
      errContainer.slideDown({complete: function() {
        if (errContainer.children()[0].textContent !== '') {
          errContainer.children().empty();
        }
        if (errContainer.children()[0].textContent === '') {
          errContainer.children().append("Please keep your tweet to below 140 characters");
        }
      }});
    }
  });
});

