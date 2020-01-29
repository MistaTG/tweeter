const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const results = createTweetElement(tweet);
    $('.container').append(results)
  }
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
const oneDay = 24 * 60 * 60 * 1000;
const firstDate = new Date(tweet.created_at);
const secondDate = new Date();
const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
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
            <p class="tweet-content">${diffDays} days ago</p>
            <p class="tweet-content">links to media</p>
          </div>
        </footer>
      </article>`;

return markup;
}

$(document).ready(function() {

  renderTweets(data);
})

