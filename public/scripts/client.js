const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const results = createTweetElement(tweet);
    $('.articles').prepend(results)
  }
}

const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const createTweetElement = function(tweet) {
  const tweetDate = new Date(tweet.created_at);
  const today = new Date();
  let diffDays = '';

  if (datesAreOnSameDay(tweetDate, today)) {
    diffDays = 'today';
  } else {
    const oneDay = 24 * 60 * 60 * 1000;
    diffDays = String(Math.round(Math.abs((tweetDate - today) / oneDay)) + ' days ago');
  }
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
              <p class="tweet-content">links to media</p>
            </div>
          </footer>
        </article>`;

  return markup;
}

const loadTweets = function() {
  $.ajax('/tweets', {method: 'GET'})
  .then(function(data){
    renderTweets(data);
  })
}

$(document).ready(function() {
  loadTweets();
  
  $('.nav-icon').on('click', function() {
    $('.error-msg').slideUp();
    $('.new-tweet').slideToggle({complete: function() {
      $('.form-input').focus();
    }});
  })

  $('.float').on('click', function() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth'});
  })

  $(window).on('scroll', function() {
    if ($(window).scrollTop() - $('article').offset()['top'] > 0) {
      $('.float').css('visibility', 'visible');
    } else {
      $('.float').css('visibility', 'hidden');
    }
    if ($(window).scrollTop() === 0) {
      $('.form-input').focus();
    }
  })
})

