/**
 * Required External Modules
 */
const fs = require('fs');
require('dotenv').config();
const path = require("path");
const cors = require('cors');
const Web3 = require('web3');
const https = require('https');
const needle = require('needle');
const helmet = require("helmet");
const express = require("express");
const readline = require('readline');
const BigNumber = require('bignumber.js')
const rateLimit = require("express-rate-limit");

/**
 * App Variables
 */
const twitter_token = process.env.twitter_bearer_token;

var listOfFollowers = [];

const app = express();
const server_name = process.env.server_name;
const server_port = process.env.server_port || "8001";
const user_rate_limit = process.env.user_rate_limit;
const rate_limit_duration = process.env.rate_limit_duration;
const twitter_handle = process.env.twitter_handle;

const endpointURL = "https://api.twitter.com/1.1/statuses/show.json";


// Web page rate limit
const web_page_limiter = rateLimit({
    windowMs: ((parseInt(rate_limit_duration) * 60) * 1000),
    max: parseInt(user_rate_limit),
    message: '<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="shortcut icon" href="favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="theme-color" content="#000000"><title>Home | Rate Limit Exceeded</title><link rel="stylesheet" href="style.css"></head><body><div id="root"><div class="View WelcomeView"><h1 class="Banner">Rate Limit Exceeded</h1><br /><div class="Message center"><div class="Title"><h3>Sorry!</h3></div></div><div class="center"><img src="rate_limit.png"></img></div><div class="Message center"><p>Rate limit exceeded, Please try again later.</p></div></div></div></body></html>'
});

// API rate limit
const api_limiter = rateLimit({
    windowMs: ((parseInt(rate_limit_duration) * 60) * 1000),
    max: parseInt(user_rate_limit),
    message: "Rate limit exceeded"
});

console.log("Duration for rate limit: " + process.env.rate_limit_duration);
console.log("Amount per duration: " + process.env.user_rate_limit);
console.log("Using HTTPS: " + process.env.https);
var credentials;
if (process.env.https == "yes") {
    const ca = fs.readFileSync('/etc/letsencrypt/live/' + process.env.server_name + '/fullchain.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/' + process.env.server_name + '/cert.pem', 'utf8');
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/' + process.env.server_name + '/privkey.pem', 'utf8');
    credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
}

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.blockchain_rpc));
console.log("Web3: " + web3.version);

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "/public/")));
app.use(cors());
// Rate limiting for simple spamming of page reloads
app.use("/faucet/", web_page_limiter);
// Rate limiting for repeated API calls
app.use("/api/", api_limiter);


// TODO install CSP and do not set this to false, this was just for testing
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

/**
 * Routes Definitions
 */

app.get('/', (req, res) => {
    var direct = "Click to visit <a href=\"https://" + process.env.server_name + ":" + process.env.server_port + "/faucet\" target=\"_blank\"> :8001/faucet </a>";
    res.send(direct);
});

app.get("/faucet", (req, res) => {
    res.render("index", {
        title: "Home",
        blockchain_name: process.env.blockchain_name,
        token_amount_in_wei: process.env.token_amount_in_wei,
        rate_limit_duration: process.env.rate_limit_duration,
        twitter_handle: process.env.twitter_handle,
    });
});

async function removeLine(_handle) {
    console.log("Removing line ...");
    var data = await fs.readFileSync(path.join(process.env.data_dir, "data.txt"), 'utf-8');
    console.log("Data: " + data);
    var reg = new RegExp('^' + _handle + '.*\n', 'gm');
    console.log("Reg: " + reg);
    //console.log(reg);
    var newValue = data.replace(reg, '');
    console.log("New value: " + newValue);
    var done = await fs.writeFileSync(path.join(process.env.data_dir, "data.txt"), newValue, 'utf-8');
    console.log("Done: " + done);
}

app.post('/api/telegram/:todo', function(req, res) {

    // TODO dispence tokens based on Telegram call from helper.js file

});



app.post('/api/twitter/:tweet_id', function(req, res) {
    var blockchainBlockExplorerAddressUrl = process.env.blockchain_block_explorer_address_url
    var blockchainBlockExplorerTransactionUrl = process.env.blockchain_block_explorer_transaction_url
    var faucetPublicKey = process.env.faucet_public_key;
    var faucetPrivateKey = process.env.faucet_private_key;
    var blockchainChainId = process.env.blockchain_chain_id;
    var gasPrice = process.env.gas_price;
    var gasLimit = process.env.gas_limit;
    var tokenAmountInWei = process.env.token_amount_in_wei;
    var blockchainLogoUrl = process.env.blockchain_logo_url;
    var ethRegex = /0x[a-fA-F0-9]{40}/
    var handleRegex = /(?<!^)@_parastate/
    var tweet_id = req.params.tweet_id;
    var goodToGo = false;
    var response;
    var handle;
    var text;
    if (tweet_id.match(/incorrect/g)) {
        console.log("tweet id is broken");
        var toastObjectFail = {
            avatar: blockchainLogoUrl,
            text: "Invalid Tweet URL, click here for more information!",
            duration: 15000,
            destination: "https://help.twitter.com/en/using-twitter/tweet-and-moment-url",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #330066, #9900CC)",
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function() {} // Callback after click
        }
        response = toastObjectFail;
        res.send(response);
    } else {
        getRequest(tweet_id).then(result => {
            console.log("Full result: " + JSON.stringify(result));
            handle = result.user.id;
            console.log("ID of handle: " + handle);
            console.log("ID STRING of handle: " + handle.toString());
            text = result.full_text;
            console.log("Text: " + text);
            var resultRegex = ethRegex.exec(text);
            console.log("Eth address: " + resultRegex);
            var resultHandleRegex = handleRegex.exec(text);
            console.log("Handle is: " + resultHandleRegex);
            if (resultHandleRegex != null) {
                if (resultRegex != null) {
                    var recipientAddress = resultRegex[0];
                    var new_timestamp = Math.floor(new Date().getTime() / 1000);
                    // Rate limit data
                    var duration;
                    var times;
                    var rObject = myCache.get(handle);
                    if (rObject == undefined) {
                        duration = new_timestamp;
                        times = 0;
                    } else {
                        duration = rObject.duration;
                        times = rObject.times;
                    }
                    if ((new_timestamp - duration) > (parseInt(rate_limit_duration) * 60)) {
                        times = 0;
                    }
                    if (times <= parseInt(user_rate_limit)) {
                        goodToGo = true;
                        console.log("Removing line and setting good to go to true");
                        removeLine(handle);
                    }
                    if (rObject == undefined || goodToGo == true) {
                        if (Web3.utils.isAddress(recipientAddress)) {
                            console.log("Checking to see if handle: " + handle + ", is in that list above.");
                            if (listOfFollowers.includes(handle.toString())) {
                                var cacheObjectToStore = {};
                                cacheObjectToStore["duration"] = new_timestamp;
                                cacheObjectToStore["times"] = times + 1;
                                myCache.set(handle, cacheObjectToStore, 0);
                                fs.appendFile(path.join(process.env.data_dir, "data.txt"), handle + "," + new_timestamp + "," + times + '\n', function(err) {
                                    if (err) throw err;
                                    console.log("Updated timestamp saved");
                                });
                                console.log("Recipient address: " + recipientAddress);
                                var transactionObject = {
                                    chainId: blockchainChainId,
                                    from: faucetPublicKey,
                                    gasPrice: gasPrice,
                                    gas: gasLimit,
                                    to: recipientAddress,
                                    value: tokenAmountInWei,
                                }
                                web3.eth.accounts.signTransaction(transactionObject, faucetPrivateKey, function(error, signed_tx) {
                                    if (!error) {
                                        web3.eth.sendSignedTransaction(signed_tx.rawTransaction, function(error, sent_tx) {
                                            if (!error) {
                                                var toastObjectSuccess = {
                                                    avatar: blockchainLogoUrl,
                                                    text: "Click to see Tx",
                                                    duration: 6000,
                                                    destination: blockchainBlockExplorerTransactionUrl + signed_tx.transactionHash,
                                                    newWindow: true,
                                                    close: true,
                                                    gravity: "top", // `top` or `bottom`
                                                    position: "right", // `left`, `center` or `right`
                                                    backgroundColor: "linear-gradient(to right, #008000, #3CBC3C)",
                                                    stopOnFocus: false, // Prevents dismissing of toast on hover
                                                    onClick: function() {} // Callback after click
                                                }
                                                response = toastObjectSuccess;
                                                res.send(response);
                                            } else {
                                                var toastObjectFail = {
                                                    avatar: blockchainLogoUrl,
                                                    text: "Transaction failed!",
                                                    duration: 6000,
                                                    destination: blockchainBlockExplorerTransactionUrl + signed_tx.transactionHash,
                                                    newWindow: true,
                                                    close: true,
                                                    gravity: "top", // `top` or `bottom`
                                                    position: "right", // `left`, `center` or `right`
                                                    backgroundColor: "linear-gradient(to right, #800000, #1B1B00)",
                                                    stopOnFocus: false, // Prevents dismissing of toast on hover
                                                    onClick: function() {} // Callback after click
                                                }
                                                response = toastObjectFail;
                                                console.log("Send signed transaction failed: " + error);
                                                res.send(response);
                                            }
                                        });
                                    } else {
                                        console.log(error);
                                    }
                                });
                            } else {
                                var toastObjectFail = {
                                    avatar: blockchainLogoUrl,
                                    text: "Click here and follow " + process.env.blockchain_name + " first to receive tokens. NB. If you just followed, it may take 2 minutes to work.",
                                    duration: 15000,
                                    destination: process.env.twitter_url,
                                    newWindow: true,
                                    close: true,
                                    gravity: "top", // `top` or `bottom`
                                    position: "right", // `left`, `center` or `right`
                                    backgroundColor: "linear-gradient(to right, #330066, #9900CC)",
                                    stopOnFocus: false, // Prevents dismissing of toast on hover
                                    onClick: function() {} // Callback after click
                                }
                                response = toastObjectFail;
                                res.send(response);
                            }
                        } else {
                            var toastObjectFail = {
                                avatar: blockchainLogoUrl,
                                text: "The recipient address in the Tweet is not valid",
                                duration: 15000,
                                close: true,
                                gravity: "top", // `top` or `bottom`
                                position: "right", // `left`, `center` or `right`
                                backgroundColor: "linear-gradient(to right, #FF0000, #800000)",
                                stopOnFocus: false, // Prevents dismissing of toast on hover
                                onClick: function() {} // Callback after click
                            }
                            response = toastObjectFail;
                            res.send(response);
                        }

                    } else {
                        var toastObjectFail = {
                            avatar: blockchainLogoUrl,
                            text: "Sorry, rate limit!",
                            duration: 6000,
                            close: true,
                            gravity: "top", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            backgroundColor: "linear-gradient(to right, #FF0000, #800000)",
                            stopOnFocus: false, // Prevents dismissing of toast on hover
                            onClick: function() {} // Callback after click
                        }
                        response = toastObjectFail;
                        res.send(response);
                    }
                } else {
                    var toastObjectFail = {
                        avatar: blockchainLogoUrl,
                        text: "The recipient address in the Tweet is not valid",
                        duration: 15000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        backgroundColor: "linear-gradient(to right, #FF0000, #800000)",
                        stopOnFocus: false, // Prevents dismissing of toast on hover
                        onClick: function() {} // Callback after click
                    }
                response = toastObjectFail;
                res.send(response);
                }
            } else {
                var toastObjectFail = {
                    avatar: blockchainLogoUrl,
                    text: "You must mention " + process.env.twitter_handle + " somewhere in your tweet (except at the start)",
                    duration: 15000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "linear-gradient(to right, #FF0000, #800000)",
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    onClick: function() {} // Callback after click
                }
            response = toastObjectFail;
            res.send(response);
        }
        });
    }
});


// Address access
app.post('/api/:recipient_address', function(req, res) {
    var response;
    console.log('Transfer');
    var recipientAddress = req.params.recipient_address;
    console.log("Recipient address: " + recipientAddress);
    var blockchainBlockExplorerAddressUrl = process.env.blockchain_block_explorer_address_url
    var blockchainBlockExplorerTransactionUrl = process.env.blockchain_block_explorer_transaction_url
    var faucetPublicKey = process.env.faucet_public_key;
    var faucetPrivateKey = process.env.faucet_private_key;
    var blockchainChainId = process.env.blockchain_chain_id;
    var gasPrice = process.env.gas_price;
    var gasLimit = process.env.gas_limit;
    var tokenAmountInWei = process.env.token_amount_in_wei;
    var blockchainLogoUrl = process.env.blockchain_logo_url;
    var transactionObject = {
        chainId: blockchainChainId,
        from: faucetPublicKey,
        gasPrice: gasPrice,
        gas: gasLimit,
        to: recipientAddress,
        value: tokenAmountInWei,
    }
    web3.eth.accounts.signTransaction(transactionObject, faucetPrivateKey, function(error, signed_tx) {
        if (!error) {
            web3.eth.sendSignedTransaction(signed_tx.rawTransaction, function(error, sent_tx) {
                if (!error) {
                    var toastObjectSuccess = {
                        avatar: blockchainLogoUrl,
                        text: "Click to see Tx",
                        duration: 6000,
                        destination: blockchainBlockExplorerTransactionUrl + signed_tx.transactionHash,
                        newWindow: true,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        backgroundColor: "linear-gradient(to right, #008000, #3CBC3C)",
                        stopOnFocus: false, // Prevents dismissing of toast on hover
                        onClick: function() {} // Callback after click
                    }
                    response = toastObjectSuccess;
                    res.send(response);
                } else {
                    var toastObjectFail = {
                        avatar: blockchainLogoUrl,
                        text: "Transaction failed!",
                        duration: 6000,
                        destination: blockchainBlockExplorerTransactionUrl + signed_tx.transactionHash,
                        newWindow: true,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        backgroundColor: "linear-gradient(to right, #FF0000, #800000)",
                        stopOnFocus: false, // Prevents dismissing of toast on hover
                        onClick: function() {} // Callback after click
                    }
                    response = toastObjectFail;
                    console.log("Send signed transaction failed: " + error);
                    res.send(response);
                }
            });
        } else {
            console.log(error);
        }
    });
});

/**
 * Repeat API dump to memory so we can quickly ask questions via memory 
 */



// ******** TWITTER START ********

async function getRequest(_id) {
    const params = {
        "id": _id,
        "trim_user": "true",
        "tweet_mode": "extended"
    }
    const res = await needle('get', endpointURL, params, {
        headers: {
            "authorization": `Bearer ${twitter_token}`
        }
    })
    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

// Set the user id of the blockchain twitter account that users must follow

const urlForFollowers = 'https://api.twitter.com/1.1/followers/ids.json';

const getFollowers = async () => {
  let users = [];
  let params = {
    "max_results": 5000,
    "user_id": process.env.twitter_id,
    "cursor": -1
  }

  const options = {
    headers: {
      "authorization": `Bearer ${twitter_token}`
    }
  }

  let hasNextPage = true;
  let nextToken = null;
  console.log("Retrieving followers...");
  while (hasNextPage) {
    let resp = await getPage(params, options);
    //console.log("*** Response body: " + JSON.stringify(resp));
    if (resp.next_cursor > 0) {
        for(var iter = 0; iter < resp.ids.length; iter ++){
            var temp = new BigNumber(resp.ids[iter]);
            users.push(temp.toString());
        }
      params.cursor = resp.next_cursor;
    } else {
            for(var iter = 0; iter < resp.ids.length; iter ++){
                var temp = new BigNumber(resp.ids[iter]);
                users.push(temp.toString());
            }
      hasNextPage = false;
    }
  }
  //console.log(users);
  //console.log(`Got ${users.length} users.`);
  console.log("Number of followers is: " + users.length);
  return users;
}

const getPage = async(params, options) => {
    try {
        const resp = await needle('get', urlForFollowers, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

async function doTheyFollow() {
  getFollowers().then(result => {
    //console.log(result);
    if (result.length > 0) {
      listOfFollowers = [];
      for (var i = 0; i < result.length; i++) {
            var temp = new BigNumber(result[i]);
            listOfFollowers.push(temp.toString());
        }
      console.log("Updated list of followers");
    } else {
      console.log("List from Twitter was empty so leaving followers as is for now");
    }
  });
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function seeWhoFollows() {
    while (true) {
        console.log('Sleeping for a couple of minutes...');
        await sleep(120000);
        console.log('Running again ...');
        doTheyFollow().then(followResult => {
            console.log('Checking followers, please wait ...');

        });

    }

}


/**
 * Server Activation
 */

if (process.env.https == "yes") {
    https.createServer(credentials, app).listen(server_port, process.env.host, () => {
        console.log("Welcome to faucet; using https");
        console.log("Host:" + process.env.host + "\nPort: " + server_port);
        // Do initial follower harvest

        doTheyFollow().then(followResult => {
            console.log('Checking followers, please wait ...');
        });
        // Repeat the follower harvest automatically now on; at time intervals
        seeWhoFollows();

    });
} else if (process.env.https == "no") {
    app.listen(server_port, () => {
        console.log(`Listening to requests on http://localhost:${server_port}`);
        // Do initial follower harvest
        
        doTheyFollow().then(followResult => {
            console.log('Checking followers, please wait ...');
        });
        // Repeat the follower harvest automatically now on; at time intervals
        seeWhoFollows();
        
        
    });
} else {
    console.log("ERROR: Please set the https setting in the .env config file");
}

// Node Cache
const NodeCache = require("node-cache");
const myCache = new NodeCache();
//const myCacheFollwers = new NodeCache();

// START Load data from data file
const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(process.env.data_dir, 'data.txt')),
    output: false,
    console: false
});

console.log("Loading data into cache");
readInterface.on('line', function(line) {
    var split_data = line.split(",");
    console.log("Loading " + split_data[0] + "," + split_data[1] + "," +  split_data[2]);
    var cacheObject = {};
    cacheObject["duration"] = split_data[1];
    cacheObject["times"] = split_data[2]
    myCache.set(split_data[0], cacheObject, 0);
});