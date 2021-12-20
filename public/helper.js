
// MetaMask
var web3;

window.onload = function(){
const input = document.getElementById('eth_address');
input.addEventListener('change', calculateBalances);
}

async function connectWallet() {
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
}

function clearInput() {
    document.getElementById("eth_address").value = '';
}

function calculateBalances(){
    console.log("Calculating balances");
    eth_address = document.getElementById('eth_address').value;
    var pattern = /0x[a-fA-F0-9]{40}/;
    var resultRegex = pattern.exec(eth_address);
    if (resultRegex != null) {
        var recipientAddress = resultRegex[0];
        document.getElementById("locked_balance").innerHTML = "Locked: " + recipientAddress + " = ";
    } else {
        document.getElementById("locked_balance").innerHTML = "'" + eth_address + "'" + " is not a valid address, please try again.";
    }
    

}
function onButtonClickTransfer() {
    document.getElementById("pb").style.width = '0%';
    console.log("Disabling button");
    document.getElementById("button_transfer_tokens").disabled = true;
    document.getElementById("button_transfer_tokens").style.background = '#808080';
    document.getElementById("pb").style.transition = "all 30s linear 0s";
    document.getElementById("pb").style.width = '80%';
    eth_address = document.querySelector('eth_address').value;
    console.log("Eth address: " + _eth_address);
    var toastResponse;
    return new Promise(function(resolve, reject) {
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(_eth_address);
        if (resultRegex != null) {
            var recipientAddress = resultRegex[0];
        } else {
            var toastResponse = JSON.stringify({
                avatar: "./favicon.ico",
                text: "Not a valid address",
                duration: 6000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
                stopOnFocus: false, // Prevents dismissing of toast on hover
                onClick: function() {} // Callback after click
            });
        }
        document.getElementById("pb").style.transition = "all 1s linear 0s";
        document.getElementById("pb").style.width = '100%';
        document.getElementById("pb").classList.remove("progress-bar-animated");
        var toastObject = JSON.parse(toastResponse);
        Toastify(toastObject).showToast();
        document.getElementById("button_transfer_tokens").disabled = false;
        document.getElementById("button_transfer_tokens").style.background = '#00ab66';
        document.getElementById("pb").style.width = '0%';
        resolve();

    });
}

function onButtonClickTwitterState(_tweet_url) {
    document.getElementById("pb").style.width = '0%';
    console.log("Disabling button");
    document.getElementById("button_send_tokens").disabled = true;
    document.getElementById("button_send_tokens").style.background = '#808080';
    document.getElementById("button_send_state").disabled = true;
    document.getElementById("button_send_state").style.background = '#808080';
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
            //fullUrl = "http://localhost:8001/api/twitterstate/" + tweetId;
            fullUrl = "https://testnet.faucet.parastate.io:8001/api/twitterstate/" + tweetId;
        } else {
            //fullUrl = "http://localhost:8001/api/twitterstate/" + "incorrect";
            fullUrl = "https://testnet.faucet.parastate.io:8001/api/twitterstate/" + "incorrect";
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
            document.getElementById("button_send_state").disabled = false;
            document.getElementById("button_send_state").style.background = '#00ab66';
            document.getElementById("pb").style.width = '0%';
            resolve();
        };
        xhr.onerror = reject;
        xhr.open('POST', fullUrl);
        xhr.send();
    });
}