const abi = [
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_erc20_contract_address",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "AllocationPerformed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TokensDeposited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TokensUnlocked",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "accelerateForTesting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "alreadyWithdrawn",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "depositTokens",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eighteenMonths",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "erc20Contract",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "initialTimestamp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "revertAccelerator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "setTimestamp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "timestampSet",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferAccidentallyLockedTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferTimeLockedTokensAfter12Months",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferTimeLockedTokensAfter18Months",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferTimeLockedTokensAfter24Months",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twelveMonths",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "twentyFourMonths",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "vertex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address payable",
                "name": "ownersAddress",
                "type": "address"
            }
        ],
        "name": "withdrawEth",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
const address = '0xB348e54a531b3C566b5D7d3c05DF528672C74Dec';

window.onload = function(){
    const input = document.getElementById('eth_address');
    input.addEventListener('change', calculateBalances);
}

async function connectWallet() {
    console.log("Connecting to wallet ...");
}

function clearInput() {
    document.getElementById("eth_address").value = '';
}

async function calculateBalances(){
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    console.log("Calculating balances");
    eth_address = document.getElementById('eth_address').value;
    var pattern = /0x[a-fA-F0-9]{40}/;
    var resultRegex = pattern.exec(eth_address);
    if (resultRegex != null) {
        var recipientAddress = resultRegex[0];
        // Optional get ETH balance for account
        //var balance = await provider.getBalance(resultRegex[0])
        //var formattedBalance = ethers.utils.formatEther(balance)
        const timeLockContract = new ethers.Contract(address, abi, provider);
        const initialTimestamp = await timeLockContract.initialTimestamp();
        usersBalance = await timeLockContract.balances(resultRegex[0]);
        alreadyWithdrawn = await timeLockContract.alreadyWithdrawn(resultRegex[0]);
        document.getElementById("locked").innerHTML = usersBalance + " STATE";
        document.getElementById("withdrawn").innerHTML = alreadyWithdrawn + " STATE";
        document.getElementById("available").innerHTML = alreadyWithdrawn + " STATE";

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
    eth_address = document.getElementById('eth_address').value;
    console.log("Eth address: " + eth_address);
    var toastResponse;
    return new Promise(function(resolve, reject) {
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(eth_address);
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