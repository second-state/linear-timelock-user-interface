function onButtonClick(_address) {
  var toastResponse;
  return new Promise(function(resolve, reject) {
      var fullUrl = "http://localhost:8001/api/" + _address;
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if (this.responseText.startsWith("Rate limit exceeded")) {
            var toastResponse = JSON.stringify({
              avatar: "./rate_limit.png",
              text: "Rate limit exceeded!",
              duration: 6000,
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
              stopOnFocus: false, // Prevents dismissing of toast on hover
              onClick: function() {} // Callback after click
            });
          } else {
            var toastResponse = this.responseText;
          }
          var toastObject = JSON.parse(toastResponse); 
          Toastify(toastObject).showToast(); 
          resolve();
        };
        xhr.onerror = reject;
        xhr.open('POST', fullUrl);
        xhr.send();
      });
  }

  function clearTwitterInput() {
    document.getElementById("recipient_address").value = '';
  }


/*
const endpointURL = "https://api.twitter.com/2/tweets?ids=";



async function getRequest(_ids, _twitter_bearer_token) {

    // These are the parameters for the API request
    // specify Tweet IDs to fetch, and any additional fields that are required
    // by default, only the Tweet ID and text are returned
    const params = {
        "ids": _ids, // Edit Tweet IDs to look up
        //"tweet.fields": "lang,author_id", // Edit optional query parameters here
        //"user.fields": "created_at" // Edit optional query parameters here
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${_twitter_bearer_token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

*/

function onButtonClickTwitter(_tweet_url) {
  console.log("Tweet URL: " + _tweet_url);
  var toastResponse;
  return new Promise(function(resolve, reject) {
    var pattern = /[0-9]*$/;
    console.log("Pattern: " + pattern);
    var resultRegex = pattern.exec(_tweet_url);
    console.log("resultRegex: " + resultRegex);
    var tweetId = resultRegex[0];
    console.log("Tweet id: " + tweetId);
      var fullUrl = "http://localhost:8001/api/twitter/" + tweetId;
      console.log("Full URL: " + fullUrl);
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if (this.responseText.startsWith("Rate limit exceeded")) {
            var toastResponse = JSON.stringify({
              avatar: "./rate_limit.png",
              text: "Rate limit exceeded!",
              duration: 6000,
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
              stopOnFocus: false, // Prevents dismissing of toast on hover
              onClick: function() {} // Callback after click
            });
          } else {
            var toastResponse = this.responseText;
          }
          var toastObject = JSON.parse(toastResponse); 
          Toastify(toastObject).showToast(); 
          resolve();
        };
        xhr.onerror = reject;
        xhr.open('POST', fullUrl);
        xhr.send();
      });
  }


  