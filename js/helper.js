const abi = [
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
        "inputs": [
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "bulkDepositTokens",
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
        "name": "disarmAcceleratorFunctionality",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "finalizeAllIncomingDeposits",
        "outputs": [],
        "stateMutability": "nonpayable",
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
    },
    {
        "inputs": [],
        "name": "accelerateFunctionDisarmed",
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
        "inputs": [],
        "name": "allIncomingDepositsFinalised",
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
    }
];

const address = '0xB153e5635898A80561f149517Bce82897a0dC216';
window.ethereum.enable();

// IMPORTANT - which address are you pasting here?
// THIS MUST BE THE ERC20 ADDRESS NOT THE TIMELOCK ADDRESS
const erc20_contract_address = '0xebf9b11b26A31B96Ce1860C2Bc8d7aA3Cd38C5db';


window.onload = function() {
    const input = document.getElementById('eth_address');
    input.addEventListener('change', calculateBalances);
    connectWallet();
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var provider;

class Amounts {

    constructor(){
        this.locked = 0;
        this.withdrawn = 0;
        this.available = 0;
    }

    getLocked(){
        return this.locked;
    }

    getWithdrawn(){
        return this.withdrawn;
    }

    getAvailable(){
        return this.available;
    }

    setLocked(_locked){
        this.locked = _locked;
    }

    setWithdrawn(_withdrawn){
        this.withdrawn = _withdrawn;
    }

    setAvailable(_available){
        this.available = _available;
    }
}

var amounts = new Amounts();


async function connectWallet() {
    window.ethereum.enable();
    console.log('Called connect wallet which is inside helper.js');
    provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    console.log(signer);
    var addressOfSigner = await signer.getAddress();
    document.getElementById("eth_address").value = addressOfSigner;
}

function clearInput() {
    document.getElementById("eth_address").value = '';
    document.getElementById("state_amount").value = '';
}

async function calculateBalances() {
    window.ethereum.enable();
    document.getElementById("pb").style.width = '0%';
    console.log("Disabling button");
    document.getElementById("button_calculate_balances").disabled = true;
    document.getElementById("pb").style.transition = "all 30s linear 0s";
    document.getElementById("pb").style.width = '80%';
    var toastResponse;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    var currentBlock = await provider.getBlock("latest");
    currentTime = currentBlock.timestamp;
    console.log("Current time: " + currentTime);
    const signer = provider.getSigner();
    console.log(signer);
    console.log("Calculating balances");
    eth_address = document.getElementById('eth_address').value;
    var pattern = /0x[a-fA-F0-9]{40}/;
    var resultRegex = pattern.exec(eth_address);
    if (resultRegex != null) {
        var recipientAddress = resultRegex[0];
        const timeLockContract = new ethers.Contract(address, abi, provider);
        const initialTimestamp = await timeLockContract.initialTimestamp();
        console.log("Current time: " + currentTime);
        console.log("Initial timestamp of contract: " + initialTimestamp);
        const twelveMonthTimestamp = await timeLockContract.twelveMonths();
        console.log("12: " + twelveMonthTimestamp);
        const eighteenMonthTimestamp = await timeLockContract.eighteenMonths();
        console.log("18: " + eighteenMonthTimestamp);
        const twentyFourMonthTimestamp = await timeLockContract.twentyFourMonths();
        console.log("24: " + twentyFourMonthTimestamp);
        usersBalance = await timeLockContract.balances(resultRegex[0]);
        usersBalanceBN = new ethers.BigNumber.from(usersBalance);
        amounts.setLocked(usersBalanceBN);
        console.log("User balance: " + usersBalance);
        alreadyWithdrawn = await timeLockContract.alreadyWithdrawn(resultRegex[0]);
        alreadyWithdrawnBN = new ethers.BigNumber.from(alreadyWithdrawn);
        amounts.setWithdrawn(alreadyWithdrawnBN);
        console.log("already withdrawn: " + alreadyWithdrawn);
        vertexAmount = await timeLockContract.vertex(resultRegex[0]);
        vertexAmountBN = new ethers.BigNumber.from(vertexAmount);
        console.log("Vertex amount: " + vertexAmount);
        if (usersBalance < 1 && usersBalance > 0){
            document.getElementById("locked").innerHTML = "< 1";
        } else {
            document.getElementById("locked").innerHTML = ethers.utils.formatEther(amounts.getLocked());
        }
        if (alreadyWithdrawn < 1 && alreadyWithdrawn > 0){
            document.getElementById("withdrawn").innerHTML = "< 1";
        } else {
            document.getElementById("withdrawn").innerHTML = ethers.utils.formatEther(amounts.getWithdrawn());
        }
        //document.getElementById("available").innerHTML = vertexAmount - alreadyWithdrawn;
        if (currentTime >= twentyFourMonthTimestamp) {
            amounts.setAvailable(usersBalanceBN);
        } else if (
            currentTime >= eighteenMonthTimestamp) {
            available = ((vertexAmountBN.div(3)).mul(2)).sub(alreadyWithdrawnBN);
            availableBN = new ethers.BigNumber.from(available.toString());
            amounts.setAvailable(availableBN);
        } else if (
            currentTime >= twelveMonthTimestamp) {
            available = (vertexAmountBN.div(3)).sub(alreadyWithdrawnBN);
            availableBN = new ethers.BigNumber.from(available.toString());
            amounts.setAvailable(availableBN);
        } else if (
            currentTime < twelveMonthTimestamp) {
            availableBN = new ethers.BigNumber.from("0");
            amounts.setAvailable(availableBN);
            console.log("Less than 12 months has passed");
            var unlockCommences = new Date(twelveMonthTimestamp * 1000);
            var toastResponse = JSON.stringify({
                avatar: "images/favicon.ico",
                text: "Unlocking commences at: " + unlockCommences.toLocaleString(),
                duration: 10000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
                stopOnFocus: false, // Prevents dismissing of toast on hover
                onClick: function() {} // Callback after click
            });
            var toastObject = JSON.parse(toastResponse);
            Toastify(toastObject).showToast();
        }
        if (available <1 && available > 0){
            document.getElementById("available").innerHTML = "< 1";
        } else {
            document.getElementById("available").innerHTML = ethers.utils.formatEther(amounts.getAvailable());
        }
        document.getElementById("state_amount").value = ethers.utils.formatUnits(amounts.getAvailable(), 0);
    } else {
        var toastResponse = JSON.stringify({
            avatar: "images/favicon.ico",
            text: "Not a valid Ethereum address!",
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function() {} // Callback after click
        });
        var toastObject = JSON.parse(toastResponse);
        Toastify(toastObject).showToast();
    }
        document.getElementById("pb").style.transition = "all 1s linear 0s";
        document.getElementById("pb").style.width = '100%';
        sleep(1000).then(() => {
        document.getElementById("pb").classList.remove("progress-bar-animated");
        document.getElementById("button_calculate_balances").disabled = false;
        document.getElementById("pb").style.width = '0%';
        });
}

async function onButtonClickTransfer() {
    window.ethereum.enable();
    document.getElementById("pb").style.width = '0%';
    console.log("Disabling button");
    document.getElementById("button_transfer_tokens").disabled = true;
    document.getElementById("pb").style.transition = "all 30s linear 0s";
    document.getElementById("pb").style.width = '80%';

    var toastResponse;
    state_amount = document.getElementById('state_amount').value;
    // Ensure that state amount is a real number, if not then we skip everything and send a toast message 
    try {
    stateAmountInWei = new ethers.BigNumber.from(state_amount);
    console.log("Big Number: " + stateAmountInWei);
    } catch(err){
        sleep(1000).then(() => {
        document.getElementById("pb").style.transition = "all 1s linear 0s";
        document.getElementById("pb").style.width = '100%';
        document.getElementById("pb").classList.remove("progress-bar-animated");
        document.getElementById("button_transfer_tokens").disabled = false;
        document.getElementById("pb").style.width = '0%';
                });
        var toastResponse = JSON.stringify({
            avatar: "images/favicon.ico",
            text: "Token amount is not a valid number!",
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function() {} // Callback after click
        });
        var toastObject = JSON.parse(toastResponse);
        Toastify(toastObject).showToast();
        console.log("Token amount is not a valid number");
        throw "exit";
    }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    var currentBlock = await provider.getBlock("latest");
    currentTime = currentBlock.timestamp;
    console.log("Current time: " + currentTime);
    const signer = provider.getSigner();
    console.log(signer);
    console.log("Calculating balances");
    eth_address = document.getElementById('eth_address').value;
    var pattern = /0x[a-fA-F0-9]{40}/;
    var resultRegex = pattern.exec(eth_address);
    if (resultRegex != null) {
        var recipientAddress = resultRegex[0];
        const timeLockContract = new ethers.Contract(address, abi, signer);
        const initialTimestamp = await timeLockContract.initialTimestamp();
        console.log("Current time: " + currentTime);
        console.log("Initial timestamp of contract: " + initialTimestamp);
        const twelveMonthTimestamp = await timeLockContract.twelveMonths();
        console.log("12: " + twelveMonthTimestamp);
        const eighteenMonthTimestamp = await timeLockContract.eighteenMonths();
        console.log("18: " + eighteenMonthTimestamp);
        const twentyFourMonthTimestamp = await timeLockContract.twentyFourMonths();
        console.log("24: " + twentyFourMonthTimestamp);
        usersBalance = await timeLockContract.balances(resultRegex[0]);
        usersBalanceBN = new ethers.BigNumber.from(usersBalance);
        console.log("User balance: " + usersBalance);
        alreadyWithdrawn = await timeLockContract.alreadyWithdrawn(resultRegex[0]);
        alreadyWithdrawnBN = new ethers.BigNumber.from(alreadyWithdrawn);
        console.log("already withdrawn: " + alreadyWithdrawn);
        vertexAmount = await timeLockContract.vertex(resultRegex[0]);
        vertexAmountBN = new ethers.BigNumber.from(vertexAmount);
        console.log("Vertex amount: " + vertexAmount);
        document.getElementById("locked").innerHTML = ethers.utils.formatEther(usersBalance);
        document.getElementById("withdrawn").innerHTML = ethers.utils.formatEther(alreadyWithdrawn);
        //document.getElementById("available").innerHTML = vertexAmount - alreadyWithdrawn;
        var available;
        console.log("Executing contract");
        console.log("Contract address: " + address);
        console.log("Recipient address: " + recipientAddress);
        console.log("Amount: " + stateAmountInWei);
        if (currentTime >= twentyFourMonthTimestamp) {
            console.log("Accessing after 24 month period!");
            available = usersBalance;
            response = await timeLockContract.transferTimeLockedTokensAfter24Months(erc20_contract_address, recipientAddress, stateAmountInWei);
            console.log("Response: " + response);
        } else if (
            currentTime >= eighteenMonthTimestamp) {
            console.log("Accessing after 18 month period!");
            available = ((vertexAmountBN.div(3)).mul(2)).sub(alreadyWithdrawnBN);
            response = await timeLockContract.transferTimeLockedTokensAfter18Months(erc20_contract_address, recipientAddress, stateAmountInWei);
            console.log("Response: " + response);
        } else if (
            currentTime >= twelveMonthTimestamp) {
            console.log("Accessing after 12 month period!");
            available = (vertexAmountBN.div(3)).sub(alreadyWithdrawnBN);
            response = await timeLockContract.transferTimeLockedTokensAfter12Months(erc20_contract_address, recipientAddress, stateAmountInWei);
            console.log("Response: " + response);
        } else if (
            currentTime < twelveMonthTimestamp) {
            available = 0;
            console.log("Less than 12 months has passed");
            var unlockCommences = new Date(twelveMonthTimestamp * 1000);
            var toastResponse = JSON.stringify({
                avatar: "images/favicon.ico",
                text: "Unlocking commences at: " + unlockCommences.toLocaleString(),
                duration: 10000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
                stopOnFocus: false, // Prevents dismissing of toast on hover
                onClick: function() {} // Callback after click
            });
            var toastObject = JSON.parse(toastResponse);
            Toastify(toastObject).showToast();
        }
        if (available <1 && available > 0){
            document.getElementById("available").innerHTML = "< 1";
        } else {
            document.getElementById("available").innerHTML = ethers.utils.formatEther(available);
        }
    } else {
        var toastResponse = JSON.stringify({
            avatar: "images/favicon.ico",
            text: "Not a valid Ethereum address!",
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #FF6600, #FFA500)",
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function() {} // Callback after click
        });
        var toastObject = JSON.parse(toastResponse);
        Toastify(toastObject).showToast();
    }
        sleep(1000).then(() => {
        document.getElementById("pb").style.transition = "all 1s linear 0s";
        document.getElementById("pb").style.width = '100%';
        document.getElementById("pb").classList.remove("progress-bar-animated");
        document.getElementById("button_transfer_tokens").disabled = false;
        document.getElementById("pb").style.width = '0%';
                });
  }