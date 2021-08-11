// Twitter sample code
// https://github.com/twitterdev/Twitter-API-v2-sample-code
//
// We will look up followers of the ParaState account like this
// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Follows-Lookup/followers_lookup.js
//
// We will then read the tweet like this
// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Tweet-Lookup/get_tweets_with_bearer_token.js
//
// 
// index.js

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
const rateLimit = require("express-rate-limit");

/**
 * App Variables
 */
const twitter_token = process.env.twitter_bearer_token;

const app = express();
const server_name = process.env.server_name;
const server_port = process.env.server_port || "8001";
const user_rate_limit = process.env.user_rate_limit;
const rate_limit_duration = process.env.rate_limit_duration;

const endpointURL = "https://api.twitter.com/2/tweets?ids=";

async function getRequest(_ids) {

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
            "authorization": `Bearer ${twitter_token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}


function onButtonClickTwitter(_tweet_url) {
  var toastResponse;
  return new Promise(function(resolve, reject) {
    var pattern = /[0-9]*$/;
    var resultRegex = pattern.exec(_tweet_url);
    var tweetId = resultRegex[0];
    // We have tweet id so now we need to read the tweet
    getRequest(tweetId).then(result => {
      console.log(result); 
    })
      // Finally we extract the address from the Tweet
      var address = "0x70346505F0F769dC14d39460eec1d7872FDB3d0D";
      var fullUrl = "http://localhost:8001/api/" + address;
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

// Do we have access to these process env variables

// Web page rate limit
const web_page_limiter = rateLimit({
  windowMs: ((parseInt(rate_limit_duration) * 60) * 1000),
  max: parseInt(user_rate_limit),
  message: '<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="shortcut icon" href="favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="theme-color" content="#000000"><title>Home | Rate Limit Exceeded</title><link rel="stylesheet" href="style.css"></head><body><div id="root"><div class="View WelcomeView"><h1 class="Banner">Rate Limit Exceeded</h1><div class="Message center"><div class="Title"><h3>Sorry!</h3></div></div><div class="center"><img src="rate_limit.png"></img></div><div class="Message center"><p>Rate limit exceeded, Please try again later.</p></div></div></div></body></html>'
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
  });
});

function removeLine(_handle) {
  var data = fs.readFileSync(path.join(process.env.data_dir, "data.txt"), 'utf-8');
  var reg = new RegExp('^' + _handle + '.*\n');
  console.log(reg);
  var newValue = data.replace(reg, '');
  console.log(newValue);
  fs.writeFileSync(path.join(process.env.data_dir, "data.txt"), newValue, 'utf-8');
}

// Twitter Access
app.post('/api/twitter/:tweet_id', function(req, res) {
  var goodToGo = false;
  var response;
  console.log('Transfer');
  var twitterUrl = req.params.tweet_url;
  var fullUrl = "http://localhost:8001/api/twitter/" + twitterUrl;
  var pattern = /[0-9]*$/;
  var resultRegex = pattern.exec(fullUrl);
  var tweetId = resultRegex[0];
  console.log("Twitter id is: " + tweet_id);
  getRequest(tweet_id).then(result => {
    console.log(result); 
})
  var new_timestamp = Math.floor(new Date().getTime() / 1000);
  var timestamp = myCache.get(handle);
  if ((new_timestamp - timestamp) > (parseInt(rate_limit_duration) * 60)) {
    goodToGo = true;
    removeLine(handle);
  }
  if (timestamp == undefined || goodToGo == true) {
    myCache.set(handle, new_timestamp, 0);
    fs.appendFile(path.join(process.env.data_dir, "data.txt"), handle + "," + new_timestamp + '\n', function(err) {
      if (err) throw err;
      console.log("Updated timestamp saved");
    });
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
            response =  toastObjectSuccess;
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
  } else {
    var toastObjectTwitterFail = {
      avatar: blockchainLogoUrl,
      text: "Sorry!",
      duration: 6000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: "linear-gradient(to right, #FF0000, #800000)",
      stopOnFocus: false, // Prevents dismissing of toast on hover
      onClick: function() {} // Callback after click
    }
    response = toastObjectTwitterFail;
    console.log("Rate limiter: " + error);
    res.send(response);
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
          response =  toastObjectSuccess;
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
 * Server Activation
 */

if (process.env.https == "yes") {
  https.createServer(credentials, app).listen(server_port, process.env.host, () => {
    console.log("Welcome to faucet; using https");
    console.log("Host:" + process.env.host + "\nPort: " + server_port);
  });
} else if (process.env.https == "no") {
  app.listen(server_port, () => {
    console.log(`Listening to requests on http://localhost:${server_port}`);
  });
} else {
  console.log("ERROR: Please set the https setting in the .env config file");
}

// Node Cache
const NodeCache = require("node-cache");
const myCache = new NodeCache();

// START Load data from data file
const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(process.env.data_dir, 'data.txt')),
    output: false,
    console: false
});

console.log("Loading data into cache");
readInterface.on('line', function(line) {
    var split_data = line.split(",");
    console.log("Loading " + split_data[0] + ": " + split_data[1] + ".");
    myCache.set(split_data[0], split_data[1], 0);
});
