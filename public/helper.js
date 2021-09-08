/*
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
*/

function clearTwitterInput() {
    document.getElementById("tweet_url").value = '';
}

function onButtonClickTwitter(_tweet_url) {
    document.getElementById("pb").style.width = '0%';
    console.log("Disabling button");
    document.getElementById("button_send_tokens").disabled = true;
    document.getElementById("button_send_tokens").style.background = '#808080';
    document.getElementById("pb").style.transition = "all 30s linear 0s";
    document.getElementById("pb").style.width = '80%';
    console.log("Tweet URL: " + _tweet_url);
    var toastResponse;
    var fullUrl;
    return new Promise(function(resolve, reject) {
        var clean_tweet_url = _tweet_url.split('?')[0];
        console.log("Clean url: " + clean_tweet_url);
        var pattern = /https\:\/\/twitter.com\/.*\/status\/[0-9]*$/;
        var resultRegex = pattern.exec(clean_tweet_url);
        var pattern_id = /[0-9]*$/;
        var resultRegex_id = pattern_id.exec(clean_tweet_url);
        var tweetId = resultRegex_id[0];
        console.log("rr" + resultRegex);
        console.log("rr2" + resultRegex_id);
        if (resultRegex != null && resultRegex_id != null) {
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
            document.getElementById("pb").style.transition = "all 1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            document.getElementById("pb").classList.remove("progress-bar-animated");
            var toastObject = JSON.parse(toastResponse);
            Toastify(toastObject).showToast();
            document.getElementById("button_send_tokens").disabled = false;
            document.getElementById("button_send_tokens").style.background = '#00ab66';
            document.getElementById("pb").style.width = '0%';
            resolve();
        };
        xhr.onerror = reject;
        xhr.open('POST', fullUrl);
        xhr.send();
    });
}