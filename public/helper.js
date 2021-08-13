function onButtonClick(_address) {
    var toastResponse;
    return new Promise(function(resolve, reject) {
        var fullUrl = "https://localhost:8001/api/" + _address;
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
        var fullUrl = "https://localhost:8001/api/twitter/" + tweetId;
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