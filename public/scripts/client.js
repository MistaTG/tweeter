// The main renderTweets function that appends each Object to the DOM
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const results = createTweetElement(tweet);
    $('.articles').prepend(results);
  }
};

// Parses over all the data passed in and gives back an html article element with the data from a template
const createTweetElement = function(tweet) {
  // Day handling logic
  const tweetDate = new Date(tweet.created_at);
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const daysApart = Math.round(Math.abs((tweetDate - today) / oneDay));
  let diffDays = '';

  if (daysApart === 0) {
    diffDays = 'today';
  } else if (daysApart === 1) {
    diffDays = 'yesterday';
  } else {
    diffDays = daysApart + ' days ago';
  }

  console.log(diffDays);
  const markup = `
  <article class="tweet-container">
          <header class="article-tweet tweet-header">
            <div class="tweet-header-group">
              <img class="user-img" src="${tweet.user.avatars}"></img>
              <p class="tweet-content">${tweet.user.name}</p>
            </div>
            <p class="tweet-content user-tag">${tweet.user.handle}</p>
          </header>
          <section class="article-tweet tweet-body">
            <p>${tweet.content.text}</p>
          </section>
          <footer class="article-tweet tweet-footer">
            <hr />
            <div class="tweet-footer-bottom">
              <p class="tweet-content">${diffDays}</p>
              <div class="tweet-content">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-thumbs-up"></i>
              </div>
            </div>
          </footer>
        </article>`;

  return markup;
};

// Does an ajax call to get the tweet data and pass it along
const loadTweets = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then(function(data) {
      renderTweets(data);
    });
};

$(document).ready(function() {
  loadTweets();
  
  // Hide the form on load, couldnt use display: none in css since was already using display: grid;
  $('.new-tweet').hide();
  
  // Adds functionality to the nav button
  $('.nav-icon').on('click', function() {
    $('.error-msg').slideUp();
    $('.new-tweet').slideToggle({complete: function() {
      $('.form-input').focus();
    }});
  });

  // Adds functionality to the jump to top button
  $('.float').on('click', function() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth'});
  });

  // Hides and shows the nav button and jump to top button on scroll
  $(window).on('scroll', function() {
    if ($(window).scrollTop() - $('article').offset()['top'] > 0) {
      $('.float').css('visibility', 'visible');
      $('.nav-new-tweet').css('visibility', 'hidden');
      $('.nav-icon').css('visibility', 'hidden');
    } else {
      $('.float').css('visibility', 'hidden');
      $('.nav-new-tweet').css('visibility', 'visible');
      $('.nav-icon').css('visibility', 'visible');
    }
    if ($(window).scrollTop() === 0) {
      $('.form-input').focus();
    }
  });
});

