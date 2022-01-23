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
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cliffEdge",
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
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "finalizeAllIncomingDeposits",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "mostRecentUnlockTimestamp",
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
        "name": "netReleasePeriod",
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
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "releaseEdge",
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
                "name": "_cliffTimePeriod",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_releaseTimePeriod",
                "type": "uint256"
            }
        ],
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
        "name": "transferTimeLockedTokensAfterTimePeriod",
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
];

// Address of the linear timelock instance
const linear_address = '0x3E6eFdBAE123E57b7485E303e6a87823D278a28B';


// IMPORTANT - which address are you pasting here?
// THIS MUST BE THE ERC20 ADDRESS NOT THE TIMELOCK ADDRESS
const erc20_contract_address = '0x23D91837fceE9b52D76e2BE18410D9b2522f681D';

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class Amounts {

    constructor() {
        this.locked = new ethers.BigNumber.from('0');
        this.withdrawn = new ethers.BigNumber.from('0');
        this.available = new ethers.BigNumber.from('0');
        this.cliffEdge = new ethers.BigNumber.from('0');
        this.releaseEdge = new ethers.BigNumber.from('0');
        this.currentTime = new ethers.BigNumber.from('0');
        this.netReleasePeriod = new ethers.BigNumber.from('0');
        this.mostRecentUnlockTimestamp = new ethers.BigNumber.from('0');
        this.weiPerSecond = new ethers.BigNumber.from('0');
    }

    getLocked() {
        return this.locked;
    }

    getWithdrawn() {
        return this.withdrawn;
    }

    getAvailable() {
        return this.available;
    }

    getCliffEdge(){
        return this.cliffEdge;
    }

    getReleaseEdge(){
        return this.releaseEdge;
    }

    getCurrentTime(){
        return this.currentTime;
    }

    getNetReleasePeriod(){
        return this.netReleasePeriod;
    }

    getMostRecentUnlockTimestamp(){
        return this.mostRecentUnlockTimestamp;
    }

    getWeiPerSecond(){
        return this.weiPerSecond;
    }

    setLocked(_locked) {
        this.locked = this.locked.add(_locked);
    }

    setWithdrawn(_withdrawn) {
        this.withdrawn = this.withdrawn.add(_withdrawn);
    }

    setAvailable(_available) {
        this.available = this.available.add(_available);
    }

    setCliffEdge(_cliffEdge){
        this.cliffEdge = _cliffEdge;
    }

    setReleaseEdge(_releaseEdge){
        this.releaseEdge = _releaseEdge;
    }

    setCurrentTime(_currentTime){
        this.currentTime = _currentTime;
    }

    setNetReleasePeriod(){
        this.netReleasePeriod = this.releaseEdge.min(this.cliffEdge);
    }

    setMostRecentUnlockTimestamp(_mostRecentUnlockTimestamp){
        this.mostRecentUnlockTimestamp = _mostRecentUnlockTimestamp;
    }

    setWeiPerSecond(_weiPerSecond){
        this.weiPerSecond = _weiPerSecond;
    }

    reset() {
        this.locked = new ethers.BigNumber.from('0');
        this.withdrawn = new ethers.BigNumber.from('0');
        this.available = new ethers.BigNumber.from('0');
        this.cliffEdge = new ethers.BigNumber.from('0');
        this.releaseEdge = new ethers.BigNumber.from('0');
        this.currentTime = new ethers.BigNumber.from('0');
        this.netReleasePeriod = new ethers.BigNumber.from('0');
        this.mostRecentUnlockTimestamp = new ethers.BigNumber.from('0');
        this.weiPerSecond = new ethers.BigNumber.from('0');
    }
}

var linearAmounts = new Amounts();
var provider;
var signer;

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Page has loaded ...");
    window.ethereum.enable();
    connectWallet().then(() => {
        console.log("Wallet connected in page load section");
        updateBalances().then(() => {
            console.log("Ready to unlock tokens ...")
        });
    });
});

async function connectWallet() {
    window.ethereum.enable();
    console.log('Called connect wallet which is inside helper.js');
    provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    signer = provider.getSigner();
    console.log(signer);
    var addressOfSigner = await signer.getAddress();
    document.getElementById("eth_address").value = addressOfSigner;
    document.getElementById("connect_wallet_text").style.color = "#00FF7F";
    document.getElementById("connect_wallet_text").innerHTML = "Wallet connected ✔";

}

function clearInput() {
    document.getElementById("eth_address").value = '';
    document.getElementById("state_amount").value = '';
}

async function calculateWeiPerSecond(_eth_address, ){
    (balances[_to] + alreadyWithdrawn[_to]).div(linearAmounts.getNetReleasePeriod()); 
}

async function updateBalances() {
    linearAmounts.reset();

    window.ethereum.enable();

    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Current time
    var currentBlock = await provider.getBlock("latest");
    currentTime = currentBlock.timestamp;
    currentTimeBN = new ethers.BigNumber.from(currentTime);
    linearAmounts.setCurrentTime(currentTimeBN);
    console.log("Current time: " + linearAmounts.getCurrentTime());

    // Instantiate linear timelock contract
    linearTimeLockContract = new ethers.Contract(linear_address, abi, provider);

    // Cliff edge timestamp
    cliffEdgeTimestamp = await linearTimeLockContract.cliffEdge();
    cliffEdgeTimestampBN = new ethers.BigNumber.from(cliffEdgeTimestamp);
    linearAmounts.setCliffEdge(cliffEdgeTimestampBN);

    // Release edge timestamp
    releaseEdgeTimestamp = await linearTimeLockContract.releaseEdge();
    releaseEdgeTimestampBN = new ethers.BigNumber.from(releaseEdgeTimestamp);
    linearAmounts.setReleaseEdge(releaseEdgeTimestampBN);

    // Net release period
    linearAmounts.setNetReleasePeriod();

    // If we have not hit the unlock period then just send a message and end processing
    if (
        currentTime < cliffEdgeTimestamp) {
        console.log("No tokens available yet");
        var unlockCommences = new Date(cliffEdgeTimestamp * 1000);
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
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
    } else {
        // If we have entered the unlock period then go ahead and get the amounts first
        document.getElementById("pb").style.width = '0%';
        console.log("Disabling button");
        document.getElementById("button_calculate_balances").disabled = true;
        document.getElementById("button_calculate_balances").value = "Calculating balances, please wait ...";
        document.getElementById("pb").style.transition = "all 30s linear 0s";
        document.getElementById("pb").style.width = '80%';
        var toastResponse;

        // Eth address
        console.log("Calculating balances");
        eth_address = document.getElementById('eth_address').value;
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(eth_address);
        if (resultRegex != null) {
            var recipientAddress = resultRegex[0];
            // Balance locked 
            linearUsersBalance = await linearTimeLockContract.balances(resultRegex[0]);
            linearUsersBalanceBN = new ethers.BigNumber.from(linearUsersBalance);
            linearAmounts.setLocked(linearUsersBalanceBN);
            console.log("User's balance: " + linearAmounts.getLocked());

            // Amount already withdrawn
            linearAlreadyWithdrawn = await linearTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            linearAlreadyWithdrawnBN = new ethers.BigNumber.from(linearAlreadyWithdrawn);
            linearAmounts.setWithdrawn(linearAlreadyWithdrawnBN);
            console.log("Already withdrawn: " + linearAmounts.getWithdrawn());

            // Get most recent unlock timestamp i.e. the last time this specific user last unlocked tokens
            mostRecentUnlockTimestamp = await linearTimeLockContract.mostRecentUnlockTimestamp();
            mostRecentUnlockTimestampBN = new ethers.BigNumber.from(mostRecentUnlockTimestamp);
            linearAmounts.setMostRecentUnlockTimestamp(mostRecentUnlockTimestampBN);
            console.log("Time of most recent unlock: " + linearAmounts.getMostRecentUnlockTimestamp());

            // Populate UI with values
            console.log("Adding start:");
            console.log(linearAmounts.getLocked());
            console.log("Adding end.");

            if (ethers.utils.formatEther(linearAmounts.getLocked()) < 1 && ethers.utils.formatEther(linearAmounts.getLocked()) > 0) {
                document.getElementById("locked").innerHTML = "< 1";
            } else {
                document.getElementById("locked").innerHTML = ethers.utils.formatEther(linearAmounts.getLocked());
            }

            if (ethers.utils.formatEther(linearAmounts.getWithdrawn()) < 1 && ethers.utils.formatEther(linearAmounts.getWithdrawn()) > 0) {
                document.getElementById("withdrawn").innerHTML = "< 1";
            } else {
                document.getElementById("withdrawn").innerHTML = ethers.utils.formatEther(linearAmounts.getWithdrawn());
            }
            // Calculate how many wei per second is available for this specific user
            linearAmounts.setWeiPerSecond((ethers.utils.formatEther(linearAmounts.getLocked()).add(ethers.utils.formatEther(linearAmounts.getWithdrawn()))).div(ethers.utils.formatEther(linearAmounts.getNetReleasePeriod())));
            console.log("Wei per second: " + weiPerSecond);

            // Calculate how many tokens are available, given the current time period and how much time has elapsed so far
            linearAmounts.setAvailable((linearAmounts.getCurrentTime() - linearAmounts.getMostRecentUnlockTimestamp()).mul(linearAmounts.setWeiPerSecond()));
            if ( ethers.utils.formatEther(linearAmounts.getAvailable()) < 1 && ethers.utils.formatEther(linearAmounts.getAvailable()) > 0) {
                document.getElementById("available").innerHTML = "< 1";
            } else {
                document.getElementById("available").innerHTML = ethers.utils.formatEther((linearAmounts.getAvailable());
            }
            // Print value which will be written to state_amount input box
            //console.log("Max available: " + ethers.utils.formatUnits(available).toString());
            document.getElementById("state_amount").value = ethers.utils.formatUnits(linearAmounts.getAvailable(), 0);
            document.getElementById("pb").style.transition = "all 0.1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            sleep(1000).then(() => {
                document.getElementById("pb").classList.remove("progress-bar-animated");
                document.getElementById("button_calculate_balances").disabled = false;
                document.getElementById("button_calculate_balances").value = "Refresh/Calculate Balances";
                document.getElementById("pb").style.width = '0%';
            });
        } else {
            var toastResponse = JSON.stringify({
                avatar: "../images/favicon.ico",
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
        // This section is to just show that all tokens are available (if/when release period is actually over)
        /*
            if (linearAmounts.getCurrentTime() >= linearAmounts.getReleaseEdge()){
                console.log("No time lock in place, all tokens are available");
            }
        */
    }
}

async function calculateBalancesAtStartup() {
    window.ethereum.enable();

    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Current time
    var currentBlock = await provider.getBlock("latest");
    currentTime = currentBlock.timestamp;
    currentTimeBN = new ethers.BigNumber.from(currentTime);
    console.log("Current time: " + currentTime);

    // Instantiate all 3 timelock contracts
    linearTimeLockContract = new ethers.Contract(linear_address, abi, provider);

    // Cliff edge timestamp
    cliffEdgeTimestamp = await linearTimeLockContract.cliffEdge();
    cliffEdgeTimestampBN = new ethers.BigNumber.from(cliffEdgeTimestamp);

    // Release edge timestamp
    releaseEdgeTimestamp = await linearTimeLockContract.releaseEdge();
    releaseEdgeTimestampBN = new ethers.BigNumber.from(releaseEdgeTimestamp);

    // Net release period
    releaseNetPeriod = await linearTimeLockContract.netReleasePeriod();
    releaseNetPeriodBN = new ethers.BigNumber.from(releaseNetPeriod);

    if (currentTime >= releaseEdgeTimestampBN)

    if (
        currentTime < cliffEdgeTimestamp) {
        console.log("No tokens available yet");
        var unlockCommences = new Date(cliffEdgeTimestamp * 1000);
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
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
    } else {
        linearAmounts.reset();
        document.getElementById("pb").style.width = '0%';
        console.log("Disabling button");
        document.getElementById("button_calculate_balances").disabled = true;
        document.getElementById("button_calculate_balances").value = "Calculating balances, please wait ...";
        document.getElementById("pb").style.transition = "all 30s linear 0s";
        document.getElementById("pb").style.width = '80%';
        var toastResponse;

        // Eth address
        console.log("Calculating balances");
        eth_address = document.getElementById('eth_address').value;
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(eth_address);
        if (resultRegex != null) {
            var recipientAddress = resultRegex[0];

            linearUsersBalance = await linearTimeLockContract.balances(resultRegex[0]);
            linearUsersBalanceBN = new ethers.BigNumber.from(linearUsersBalance);
            linearAmounts.incrementLocked(linearUsersBalanceBN);

            console.log("User's balance: " + linearAmounts.getLocked());
            linearAlreadyWithdrawn = await linearTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            linearAlreadyWithdrawnBN = new ethers.BigNumber.from(linearAlreadyWithdrawn);
            linearAmounts.incrementWithdrawn(linearAlreadyWithdrawnBN);
            console.log("Already withdrawn: " + linearAmounts.getWithdrawn());

            // Populate UI with values
            console.log("Adding start:");
            console.log(linearAmounts.getLocked());
            console.log("Adding end.");
            var usersBalance = ethers.utils.formatEther(linearAmounts.getLocked());
            if (usersBalance < 1 && usersBalance > 0) {
                document.getElementById("locked").innerHTML = "< 1";
            } else {
                document.getElementById("locked").innerHTML = usersBalance;
            }
            var alreadyWithdrawn = ethers.utils.formatEther(linearAmounts.getWithdrawn());
            if (alreadyWithdrawn < 1 && alreadyWithdrawn > 0) {
                document.getElementById("withdrawn").innerHTML = "< 1";
            } else {
                document.getElementById("withdrawn").innerHTML = alreadyWithdrawn;
            }
            // Calculate how much is available at this second
            var weiPerSecond = (usersBalance + alreadyWithdrawn) / releaseNetPeriod;
            console.log("Wei per second: " + weiPerSecond);
            var available = ethers.utils.formatEther(linearAmounts.getAvailable());
            if (available < 1 && available > 0) {
                document.getElementById("available").innerHTML = "< 1";
            } else {
                document.getElementById("available").innerHTML = available;
            }
            // Print value which will be written to state_amount input box
            //console.log("Max available: " + ethers.utils.formatUnits(available).toString());
            document.getElementById("state_amount").value = ethers.utils.formatUnits(linearAmounts.getAvailable(), 0);
            document.getElementById("pb").style.transition = "all 0.1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            sleep(1000).then(() => {
                document.getElementById("pb").classList.remove("progress-bar-animated");
                document.getElementById("button_calculate_balances").disabled = false;
                document.getElementById("button_calculate_balances").value = "Refresh/Calculate Balances";
                document.getElementById("pb").style.width = '0%';
            });
        }
    }
}

async function calculateBalances() {
        // Provide message if still in first time period
    if (
        currentTime < linearTimestamp) {
        console.log("Less than 30 days has passed, no tokens available yet");
        var unlockCommences = new Date(linearTimestamp * 1000);
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
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
    } else {
        linearAmounts.reset();
        window.ethereum.enable();
        document.getElementById("pb").style.width = '0%';
        console.log("Disabling button");
        document.getElementById("button_calculate_balances").disabled = true;
        document.getElementById("pb").style.transition = "all 30s linear 0s";
        document.getElementById("pb").style.width = '80%';
        var toastResponse;
        // Provider
        provider = new ethers.providers.Web3Provider(window.ethereum);

        // Current time
        var currentBlock = await provider.getBlock("latest");
        currentTime = currentBlock.timestamp;
        console.log("Current time: " + currentTime);

        // Signer
        signer = provider.getSigner();
        console.log(signer);

        // Eth address
        console.log("Calculating balances");
        eth_address = document.getElementById('eth_address').value;
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(eth_address);
        if (resultRegex != null) {
            var recipientAddress = resultRegex[0];

            // Instantiate all 3 timelock contracts
            linearTimeLockContract = new ethers.Contract(linear_address, abi, provider);

            // Instances timestamps
            linearTimestamp = await linearTimeLockContract.timePeriod();
            console.log("30 day: " + linearTimestamp);

            // 30 day contract balances
            linearUsersBalance = await linearTimeLockContract.balances(resultRegex[0]);
            linearUsersBalanceBN = new ethers.BigNumber.from(linearUsersBalance);
            linearAmounts.incrementLocked(linearUsersBalanceBN);
            if (currentTime >= linearTimestamp) {
                linearAmounts.incrementAvailable(linearUsersBalanceBN);
            }
            console.log("30 day user balance: " + linearAmounts.getLocked());
            linearAlreadyWithdrawn = await linearTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            linearAlreadyWithdrawnBN = new ethers.BigNumber.from(linearAlreadyWithdrawn);
            linearAmounts.incrementWithdrawn(linearAlreadyWithdrawnBN);
            console.log("already withdrawn: " + linearAmounts.getWithdrawn());

            // Populate UI with values
            console.log("Adding start:");
            console.log(linearAmounts.getLocked());
            console.log("Adding end.");
            const usersBalance = ethers.utils.formatEther(linearAmounts.getLocked());
            if (usersBalance < 1 && usersBalance > 0) {
                document.getElementById("locked").innerHTML = "< 1";
            } else {
                document.getElementById("locked").innerHTML = usersBalance;
            }
            const alreadyWithdrawn = ethers.utils.formatEther(linearAmounts.getWithdrawn());
            if (alreadyWithdrawn < 1 && alreadyWithdrawn > 0) {
                document.getElementById("withdrawn").innerHTML = "< 1";
            } else {
                document.getElementById("withdrawn").innerHTML = alreadyWithdrawn;
            }
            const available = ethers.utils.formatEther(linearAmounts.getAvailable());
            if (available < 1 && available > 0) {
                document.getElementById("available").innerHTML = "< 1";
            } else {
                document.getElementById("available").innerHTML = available;
            }
            // Print value which will be written to state_amount input box
            //console.log("Max available: " + ethers.utils.formatUnits(available).toString());
            document.getElementById("state_amount").value = ethers.utils.formatUnits(linearAmounts.getAvailable(), 0);
        } else {
            var toastResponse = JSON.stringify({
                avatar: "../images/favicon.ico",
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
        document.getElementById("pb").style.transition = "all 0.1s linear 0s";
        document.getElementById("pb").style.width = '100%';
        sleep(1000).then(() => {
            document.getElementById("pb").classList.remove("progress-bar-animated");
            document.getElementById("button_calculate_balances").disabled = false;
            document.getElementById("pb").style.width = '0%';
        });
    }
}

async function onButtonClickTransfer() {
    linearAmounts.reset();
    // Provider
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Signer
    signer = provider.getSigner();
    console.log(signer);

    // Instantiate all 3 timelock contracts
    linearTimeLockContract = new ethers.Contract(linear_address, abi, signer);

    // Current time
    var currentBlock = await provider.getBlock("latest");
    currentTime = currentBlock.timestamp;
    console.log("Current time: " + currentTime);

    // UI mods
    document.getElementById("pb").style.width = '0%';
    console.log("Disabling button");
    document.getElementById("button_transfer_tokens").disabled = true;
    document.getElementById("pb").style.transition = "all 30s linear 0s";
    document.getElementById("pb").style.width = '80%';

    // Init toast response
    var toastResponse;

    // Amount to unlock
    state_amount = document.getElementById('state_amount').value;

    // Ensure that state amount is a real number, if not then we skip everything and send a toast message 
    try {
        stateAmountInWei = new ethers.BigNumber.from(state_amount);
        console.log("Big Number: " + stateAmountInWei);
    } catch (err) {
        sleep(1000).then(() => {
            document.getElementById("pb").style.transition = "all 1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            document.getElementById("pb").classList.remove("progress-bar-animated");
            document.getElementById("button_transfer_tokens").disabled = false;
            document.getElementById("pb").style.width = '0%';
        });
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
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
        sleep(1000).then(() => {
            document.getElementById("pb").style.transition = "all 1s linear 0s";
            document.getElementById("pb").style.width = '100%';
            document.getElementById("pb").classList.remove("progress-bar-animated");
            document.getElementById("button_transfer_tokens").disabled = false;
            document.getElementById("pb").style.width = '0%';
        });
        throw "exit";
    }
    if (stateAmountInWei > 0) {
        console.log("Calculating balances");
        eth_address = document.getElementById('eth_address').value;
        var pattern = /0x[a-fA-F0-9]{40}/;
        var resultRegex = pattern.exec(eth_address);
        if (resultRegex != null) {
            var recipientAddress = resultRegex[0];

            // Instances timestamps
            linearTimestamp = await linearTimeLockContract.timePeriod();
            console.log("30 day: " + linearTimestamp);

            // 30 day contract balances
            linearUsersBalance = await linearTimeLockContract.balances(resultRegex[0]);
            linearUsersBalanceBN = new ethers.BigNumber.from(linearUsersBalance);
            linearAmounts.incrementLocked(linearUsersBalanceBN);
            if (currentTime >= linearTimestamp) {
                linearAmounts.incrementAvailable(linearUsersBalanceBN);
            }
            console.log("30 day user balance: " + linearAmounts.getLocked());
            linearAlreadyWithdrawn = await linearTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            linearAlreadyWithdrawnBN = new ethers.BigNumber.from(linearAlreadyWithdrawn);
            linearAmounts.incrementWithdrawn(linearAlreadyWithdrawnBN);
            console.log("already withdrawn: " + linearAmounts.getWithdrawn());

            var valid = false;
            if (currentTime >= linearTimestamp && linearAmounts.getAvailable() > 0 && stateAmountInWei <= linearAmounts.getAvailable()) {
                valid = true;
                response = await linearTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, stateAmountInWei);
                var toastResponse = JSON.stringify({
                    avatar: "../images/favicon.ico",
                    text: "Congratulations, tokens unlocked!",
                    duration: 10000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "linear-gradient(to right, #454A21, #607D3B)",
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    onClick: function() {} // Callback after click
                });
                var toastObject = JSON.parse(toastResponse);
                Toastify(toastObject).showToast();
            } else if (currentTime >= linearTimestamp && linearAmounts.getAvailable() > 0 && stateAmountInWei > linearAmounts.getAvailable()) {
                valid = true;
                response = await linearTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, linearAmounts.getAvailable());
                var toastResponse = JSON.stringify({
                    avatar: "../images/favicon.ico",
                    text: "Congratulations, tokens unlocked!",
                    duration: 10000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "linear-gradient(to right, #454A21, #607D3B)",
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    onClick: function() {} // Callback after click
                });
                var toastObject = JSON.parse(toastResponse);
                Toastify(toastObject).showToast();
            }

            if (valid == false){
                var toastResponse = JSON.stringify({
                    avatar: "../images/sorry.png",
                    text: "Sorry, invalid request, please check input!",
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
        } else {
            var toastResponse = JSON.stringify({
                avatar: "../images/favicon.ico",
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
    } else {
        var toastResponse = JSON.stringify({
            avatar: "../images/favicon.ico",
            text: "Token amount must be greater than zero!",
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
        document.getElementById("pb").style.transition = "all 0.1s linear 0s";
        document.getElementById("pb").style.width = '100%';
        document.getElementById("pb").classList.remove("progress-bar-animated");
        document.getElementById("button_transfer_tokens").disabled = false;
        document.getElementById("pb").style.width = '0%';
    });
}

// TODO
// Change every value to BN and process only in BN
// Implement logic that allows user to unlock all tokens if releaseEdge has elapsed
// Create functions for any repeated code i.e calculating weiPerSecond etc.
// Test that we are always calculating the floor so we never get partial numbers or decimals
// Make sure that every function starts with linearAmounts.reset() function to clear 
// Every function must call updateBalance because we don't want any redundant code
// Make sure that we use ethers everywhere i.e. .mul() instead of * and .add() instead of + etc.
// See if ethers has a floor function so we never get decimals
