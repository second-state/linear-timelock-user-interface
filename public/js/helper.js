const abi = [{
        "inputs": [{
            "internalType": "contract IERC20",
            "name": "_erc20_contract_address",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
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
        "inputs": [{
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
        "inputs": [{
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
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "alreadyWithdrawn",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "balances",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "name": "contractBalance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
        }],
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
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_timePeriod",
            "type": "uint256"
        }],
        "name": "setTimestamp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "timePeriod",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "timestampSet",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "inputs": [{
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
        "inputs": [{
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
];

// These are the addresses of the 3 different timelock tokens that were deployed
// Users will be found in any of these; depending on which timelock option they chose
const thirty_day_address = '0x3adbA9E6B5779A0B7B67B70B560B7C0605fecD8f';
const sixty_day_address = '0x5093755a84bE8B3b741Fc4525f521988F841d855';
const ninety_day_address = '0x195690dBDdc9D27B3DE13D74133373f5Da593779';

// IMPORTANT - which address are you pasting here?
// THIS MUST BE THE ERC20 ADDRESS NOT THE TIMELOCK ADDRESS
const erc20_contract_address = '0xdA4ec2913Cf480fE923FC7a734c727f8543d50f7';

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class Amounts {

    constructor() {
        this.locked = new ethers.BigNumber.from('0');
        this.withdrawn = new ethers.BigNumber.from('0');
        this.available = new ethers.BigNumber.from('0');
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

    incrementLocked(_locked) {
        this.locked = this.locked.add(_locked);
    }

    incrementWithdrawn(_withdrawn) {
        this.withdrawn = this.withdrawn.add(_withdrawn);
    }

    incrementAvailable(_available) {
        this.available = this.available.add(_available);
    }

    reset() {
        this.locked = new ethers.BigNumber.from('0');
        this.withdrawn = new ethers.BigNumber.from('0');
        this.available = new ethers.BigNumber.from('0');
    }
}

var thirtyDayAmounts = new Amounts();
var sixtyDayAmounts = new Amounts();
var ninetyDayAmounts = new Amounts();
var provider;
var signer;


document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Page has loaded ...");
    window.ethereum.enable();
    connectWallet().then(() => {
        console.log("Wallet connected in page load section");
        calculateBalancesAtStartup().then(() => {
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

async function calculateBalancesAtStartup() {
        // Provide message if still in first time period
    if (
        currentTime < thirtyDayTimestamp) {
        console.log("Less than 30 days has passed, no tokens available yet");
        var unlockCommences = new Date(thirtyDayTimestamp * 1000);
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
        thirtyDayAmounts.reset();
        sixtyDayAmounts.reset();
        ninetyDayAmounts.reset();
        window.ethereum.enable();
        document.getElementById("pb").style.width = '0%';
        console.log("Disabling button");
        document.getElementById("button_calculate_balances").disabled = true;
        document.getElementById("button_calculate_balances").value = "Calculating balances, please wait ...";
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
            thirtyDayTimeLockContract = new ethers.Contract(thirty_day_address, abi, provider);
            sixtyDayTimeLockContract = new ethers.Contract(sixty_day_address, abi, provider);
            ninetyDayTimeLockContract = new ethers.Contract(ninety_day_address, abi, provider);

            // Instances timestamps
            thirtyDayTimestamp = await thirtyDayTimeLockContract.timePeriod();
            console.log("30 day: " + thirtyDayTimestamp);
            sixtyDayTimestamp = await sixtyDayTimeLockContract.timePeriod();
            console.log("60 day: " + sixtyDayTimestamp);
            ninetyDayTimestamp = await ninetyDayTimeLockContract.timePeriod();
            console.log("90 day: " + ninetyDayTimestamp);

            // 30 day contract balances
            thirtyDayUsersBalance = await thirtyDayTimeLockContract.balances(resultRegex[0]);
            thirtyDayUsersBalanceBN = new ethers.BigNumber.from(thirtyDayUsersBalance);
            thirtyDayAmounts.incrementLocked(thirtyDayUsersBalanceBN);
            if (currentTime >= thirtyDayTimestamp) {
                thirtyDayAmounts.incrementAvailable(thirtyDayUsersBalanceBN);
            }
            console.log("30 day user balance: " + thirtyDayAmounts.getLocked());
            thirtyDayAlreadyWithdrawn = await thirtyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            thirtyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(thirtyDayAlreadyWithdrawn);
            thirtyDayAmounts.incrementWithdrawn(thirtyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + thirtyDayAmounts.getWithdrawn());


            // 60 day contract balances
            sixtyDayUsersBalance = await sixtyDayTimeLockContract.balances(resultRegex[0]);
            sixtyDayUsersBalanceBN = new ethers.BigNumber.from(sixtyDayUsersBalance);
            sixtyDayAmounts.incrementLocked(sixtyDayUsersBalanceBN);
            if (currentTime >= sixtyDayTimestamp) {
                sixtyDayAmounts.incrementAvailable(sixtyDayUsersBalanceBN);
            }
            console.log("60 day user balance: " + sixtyDayAmounts.getLocked());
            sixtyDayAlreadyWithdrawn = await sixtyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            sixtyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(sixtyDayAlreadyWithdrawn);
            sixtyDayAmounts.incrementWithdrawn(sixtyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + sixtyDayAmounts.getWithdrawn());

            // 90 day contract balances
            ninetyDayUsersBalance = await ninetyDayTimeLockContract.balances(resultRegex[0]);
            ninetyDayUsersBalanceBN = new ethers.BigNumber.from(ninetyDayUsersBalance);
            ninetyDayAmounts.incrementLocked(ninetyDayUsersBalanceBN);
            if (currentTime >= ninetyDayTimestamp) {
                ninetyDayAmounts.incrementAvailable(ninetyDayUsersBalanceBN);
            }
            console.log("90 day user balance: " + ninetyDayAmounts.getLocked());
            ninetyDayAlreadyWithdrawn = await ninetyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            ninetyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(ninetyDayAlreadyWithdrawn);
            ninetyDayAmounts.incrementWithdrawn(ninetyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + ninetyDayAmounts.getWithdrawn());

            // Populate UI with values
            console.log("Adding start:");
            console.log(thirtyDayAmounts.getLocked());
            console.log(sixtyDayAmounts.getLocked());
            console.log(ninetyDayAmounts.getLocked());
            console.log("Adding end.");
            const usersBalance = ethers.utils.formatEther(thirtyDayAmounts.getLocked().add(sixtyDayAmounts.getLocked()).add(ninetyDayAmounts.getLocked()));
            if (usersBalance < 1 && usersBalance > 0) {
                document.getElementById("locked").innerHTML = "< 1";
            } else {
                document.getElementById("locked").innerHTML = usersBalance;
            }
            const alreadyWithdrawn = ethers.utils.formatEther(thirtyDayAmounts.getWithdrawn().add(sixtyDayAmounts.getWithdrawn()).add(ninetyDayAmounts.getWithdrawn()));
            if (alreadyWithdrawn < 1 && alreadyWithdrawn > 0) {
                document.getElementById("withdrawn").innerHTML = "< 1";
            } else {
                document.getElementById("withdrawn").innerHTML = alreadyWithdrawn;
            }
            const available = ethers.utils.formatEther(thirtyDayAmounts.getAvailable().add(sixtyDayAmounts.getAvailable()).add(ninetyDayAmounts.getAvailable()));
            if (available < 1 && available > 0) {
                document.getElementById("available").innerHTML = "< 1";
            } else {
                document.getElementById("available").innerHTML = available;
            }
            // Print value which will be written to state_amount input box
            //console.log("Max available: " + ethers.utils.formatUnits(available).toString());
            document.getElementById("state_amount").value = ethers.utils.formatUnits(thirtyDayAmounts.getAvailable().add(sixtyDayAmounts.getAvailable()).add(ninetyDayAmounts.getAvailable()), 0);
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
        currentTime < thirtyDayTimestamp) {
        console.log("Less than 30 days has passed, no tokens available yet");
        var unlockCommences = new Date(thirtyDayTimestamp * 1000);
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
        thirtyDayAmounts.reset();
        sixtyDayAmounts.reset();
        ninetyDayAmounts.reset();
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
            thirtyDayTimeLockContract = new ethers.Contract(thirty_day_address, abi, provider);
            sixtyDayTimeLockContract = new ethers.Contract(sixty_day_address, abi, provider);
            ninetyDayTimeLockContract = new ethers.Contract(ninety_day_address, abi, provider);

            // Instances timestamps
            thirtyDayTimestamp = await thirtyDayTimeLockContract.timePeriod();
            console.log("30 day: " + thirtyDayTimestamp);
            sixtyDayTimestamp = await sixtyDayTimeLockContract.timePeriod();
            console.log("60 day: " + sixtyDayTimestamp);
            ninetyDayTimestamp = await ninetyDayTimeLockContract.timePeriod();
            console.log("90 day: " + ninetyDayTimestamp);

            // 30 day contract balances
            thirtyDayUsersBalance = await thirtyDayTimeLockContract.balances(resultRegex[0]);
            thirtyDayUsersBalanceBN = new ethers.BigNumber.from(thirtyDayUsersBalance);
            thirtyDayAmounts.incrementLocked(thirtyDayUsersBalanceBN);
            if (currentTime >= thirtyDayTimestamp) {
                thirtyDayAmounts.incrementAvailable(thirtyDayUsersBalanceBN);
            }
            console.log("30 day user balance: " + thirtyDayAmounts.getLocked());
            thirtyDayAlreadyWithdrawn = await thirtyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            thirtyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(thirtyDayAlreadyWithdrawn);
            thirtyDayAmounts.incrementWithdrawn(thirtyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + thirtyDayAmounts.getWithdrawn());


            // 60 day contract balances
            sixtyDayUsersBalance = await sixtyDayTimeLockContract.balances(resultRegex[0]);
            sixtyDayUsersBalanceBN = new ethers.BigNumber.from(sixtyDayUsersBalance);
            sixtyDayAmounts.incrementLocked(sixtyDayUsersBalanceBN);
            if (currentTime >= sixtyDayTimestamp) {
                sixtyDayAmounts.incrementAvailable(sixtyDayUsersBalanceBN);
            }
            console.log("60 day user balance: " + sixtyDayAmounts.getLocked());
            sixtyDayAlreadyWithdrawn = await sixtyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            sixtyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(sixtyDayAlreadyWithdrawn);
            sixtyDayAmounts.incrementWithdrawn(sixtyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + sixtyDayAmounts.getWithdrawn());

            // 90 day contract balances
            ninetyDayUsersBalance = await ninetyDayTimeLockContract.balances(resultRegex[0]);
            ninetyDayUsersBalanceBN = new ethers.BigNumber.from(ninetyDayUsersBalance);
            ninetyDayAmounts.incrementLocked(ninetyDayUsersBalanceBN);
            if (currentTime >= ninetyDayTimestamp) {
                ninetyDayAmounts.incrementAvailable(ninetyDayUsersBalanceBN);
            }
            console.log("90 day user balance: " + ninetyDayAmounts.getLocked());
            ninetyDayAlreadyWithdrawn = await ninetyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            ninetyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(ninetyDayAlreadyWithdrawn);
            ninetyDayAmounts.incrementWithdrawn(ninetyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + ninetyDayAmounts.getWithdrawn());

            // Populate UI with values
            console.log("Adding start:");
            console.log(thirtyDayAmounts.getLocked());
            console.log(sixtyDayAmounts.getLocked());
            console.log(ninetyDayAmounts.getLocked());
            console.log("Adding end.");
            const usersBalance = ethers.utils.formatEther(thirtyDayAmounts.getLocked().add(sixtyDayAmounts.getLocked()).add(ninetyDayAmounts.getLocked()));
            if (usersBalance < 1 && usersBalance > 0) {
                document.getElementById("locked").innerHTML = "< 1";
            } else {
                document.getElementById("locked").innerHTML = usersBalance;
            }
            const alreadyWithdrawn = ethers.utils.formatEther(thirtyDayAmounts.getWithdrawn().add(sixtyDayAmounts.getWithdrawn()).add(ninetyDayAmounts.getWithdrawn()));
            if (alreadyWithdrawn < 1 && alreadyWithdrawn > 0) {
                document.getElementById("withdrawn").innerHTML = "< 1";
            } else {
                document.getElementById("withdrawn").innerHTML = alreadyWithdrawn;
            }
            const available = ethers.utils.formatEther(thirtyDayAmounts.getAvailable().add(sixtyDayAmounts.getAvailable()).add(ninetyDayAmounts.getAvailable()));
            if (available < 1 && available > 0) {
                document.getElementById("available").innerHTML = "< 1";
            } else {
                document.getElementById("available").innerHTML = available;
            }
            // Print value which will be written to state_amount input box
            //console.log("Max available: " + ethers.utils.formatUnits(available).toString());
            document.getElementById("state_amount").value = ethers.utils.formatUnits(thirtyDayAmounts.getAvailable().add(sixtyDayAmounts.getAvailable()).add(ninetyDayAmounts.getAvailable()), 0);
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
    thirtyDayAmounts.reset();
    sixtyDayAmounts.reset();
    ninetyDayAmounts.reset();
    // Provider
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Signer
    signer = provider.getSigner();
    console.log(signer);

    // Instantiate all 3 timelock contracts
    thirtyDayTimeLockContract = new ethers.Contract(thirty_day_address, abi, signer);
    sixtyDayTimeLockContract = new ethers.Contract(sixty_day_address, abi, signer);
    ninetyDayTimeLockContract = new ethers.Contract(ninety_day_address, abi, signer);

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
            thirtyDayTimestamp = await thirtyDayTimeLockContract.timePeriod();
            console.log("30 day: " + thirtyDayTimestamp);
            sixtyDayTimestamp = await sixtyDayTimeLockContract.timePeriod();
            console.log("60 day: " + sixtyDayTimestamp);
            ninetyDayTimestamp = await ninetyDayTimeLockContract.timePeriod();
            console.log("90 day: " + ninetyDayTimestamp);

            // 30 day contract balances
            thirtyDayUsersBalance = await thirtyDayTimeLockContract.balances(resultRegex[0]);
            thirtyDayUsersBalanceBN = new ethers.BigNumber.from(thirtyDayUsersBalance);
            thirtyDayAmounts.incrementLocked(thirtyDayUsersBalanceBN);
            if (currentTime >= thirtyDayTimestamp) {
                thirtyDayAmounts.incrementAvailable(thirtyDayUsersBalanceBN);
            }
            console.log("30 day user balance: " + thirtyDayAmounts.getLocked());
            thirtyDayAlreadyWithdrawn = await thirtyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            thirtyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(thirtyDayAlreadyWithdrawn);
            thirtyDayAmounts.incrementWithdrawn(thirtyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + thirtyDayAmounts.getWithdrawn());


            // 60 day contract balances
            sixtyDayUsersBalance = await sixtyDayTimeLockContract.balances(resultRegex[0]);
            sixtyDayUsersBalanceBN = new ethers.BigNumber.from(sixtyDayUsersBalance);
            sixtyDayAmounts.incrementLocked(sixtyDayUsersBalanceBN);
            if (currentTime >= sixtyDayTimestamp) {
                sixtyDayAmounts.incrementAvailable(sixtyDayUsersBalanceBN);
            }
            console.log("60 day user balance: " + sixtyDayAmounts.getLocked());
            sixtyDayAlreadyWithdrawn = await sixtyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            sixtyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(sixtyDayAlreadyWithdrawn);
            sixtyDayAmounts.incrementWithdrawn(sixtyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + sixtyDayAmounts.getWithdrawn());

            // 90 day contract balances
            ninetyDayUsersBalance = await ninetyDayTimeLockContract.balances(resultRegex[0]);
            ninetyDayUsersBalanceBN = new ethers.BigNumber.from(ninetyDayUsersBalance);
            ninetyDayAmounts.incrementLocked(ninetyDayUsersBalanceBN);
            if (currentTime >= ninetyDayTimestamp) {
                ninetyDayAmounts.incrementAvailable(ninetyDayUsersBalanceBN);
            }
            console.log("90 day user balance: " + ninetyDayAmounts.getLocked());
            ninetyDayAlreadyWithdrawn = await ninetyDayTimeLockContract.alreadyWithdrawn(resultRegex[0]);
            ninetyDayAlreadyWithdrawnBN = new ethers.BigNumber.from(ninetyDayAlreadyWithdrawn);
            ninetyDayAmounts.incrementWithdrawn(ninetyDayAlreadyWithdrawnBN);
            console.log("already withdrawn: " + ninetyDayAmounts.getWithdrawn());
            var valid = false;
            if (currentTime >= thirtyDayTimestamp && thirtyDayAmounts.getAvailable() > 0 && stateAmountInWei <= thirtyDayAmounts.getAvailable()) {
                valid = true;
                response = await thirtyDayTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, stateAmountInWei);
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
            } else if (currentTime >= thirtyDayTimestamp && thirtyDayAmounts.getAvailable() > 0 && stateAmountInWei > thirtyDayAmounts.getAvailable()) {
                valid = true;
                response = await thirtyDayTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, thirtyDayAmounts.getAvailable());
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

            if (currentTime >= sixtyDayTimestamp && sixtyDayAmounts.getAvailable() > 0 && stateAmountInWei <= sixtyDayAmounts.getAvailable()) {
                valid = true;
                response = await sixtyDayTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, stateAmountInWei);
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
            } else if (currentTime >= sixtyDayTimestamp && sixtyDayAmounts.getAvailable() > 0 && stateAmountInWei > sixtyDayAmounts.getAvailable()) {
                valid = true;
                response = await sixtyDayTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, sixtyDayAmounts.getAvailable());
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

            if (currentTime >= ninetyDayTimestamp && ninetyDayAmounts.getAvailable() > 0 && stateAmountInWei <= ninetyDayAmounts.getAvailable()) {
                valid = true;
                response = await ninetyDayTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, stateAmountInWei);
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
            } else if (currentTime >= ninetyDayTimestamp && ninetyDayAmounts.getAvailable() > 0 && stateAmountInWei > ninetyDayAmounts.getAvailable()) {
                valid = true;
                response = await ninetyDayTimeLockContract.transferTimeLockedTokensAfterTimePeriod(erc20_contract_address, recipientAddress, ninetyDayAmounts.getAvailable());
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