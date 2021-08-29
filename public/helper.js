function onButtonClick(_address) {
    var toastResponse;
    return new Promise(function(resolve, reject) {

        // Use this for local testing
        var fullUrl = "http://localhost:8001/api/" + _address;

        // Use this for prod
        //var fullUrl = "https://testnet.faucet.parastate.io:8001/api/" + _address;

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
    document.getElementById("tweet_url").value = '';
}


function onButtonClickTwitter(_tweet_url) {
    console.log("Tweet URL: " + _tweet_url);
    var toastResponse;
    var fullUrl;
    return new Promise(function(resolve, reject) {
        var pattern = /https\:\/\/twitter.com\/.*\/status\/[0-9]*/;
        var resultRegex = pattern.exec(_tweet_url);
        if (resultRegex != null){
            clean_tweet_url = _tweet_url.split('?')[0];
            var pattern_id = /[0-9]*$/;
            var resultRegex_id = pattern_id.exec(clean_tweet_url);
            var tweetId = resultRegex_id[0];
            fullUrl = "http://localhost:8001/api/twitter/" + tweetId;
            //fullUrl = "https://testnet.faucet.parastate.io:8001/api/twitter/" + tweetId;
        } else {
            fullUrl = "http://localhost:8001/api/twitter/" + "incorrect";
            //fullUrl = "https://testnet.faucet.parastate.io:8001/api/twitter/" + "incorrect";
        }
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


function clearTwitterInput() {
    document.getElementById("tweet_url").value = '';
}


function onButtonClickTelegram() {
  //TODO interact with Telegram API and create new Telegram endpoint in index.js file to process this input
}
