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
const helmet = require("helmet");
const express = require("express");
const rateLimit = require("express-rate-limit");

/**
 * App Variables
 */

const app = express();
const server_name = process.env.server_name;
const server_port = process.env.server_port || "8001";
const user_rate_limit = process.env.user_rate_limit;
const rate_limit_duration = process.env.rate_limit_duration;
const limiter = rateLimit({
    windowMs: ((parseInt(rate_limit_duration) * 60) * 1000), 
    max: parseInt(user_rate_limit), 
    message: 
'<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="shortcut icon" href="favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="theme-color" content="#000000"><title>Home | Faucet</title><link rel="stylesheet" href="style.css"></head><body><div id="root"><div class="View WelcomeView"><h1 class="Banner">Faucet</h1><div class="Message center"><div class="Title"><h3>Sorry!</h3></div></div><div class="center"><img src="rate_limit.png"></img></div><div class="Message center"><p>Rate limit exceeded, Please try again later.</p></div></div></div></body></html>'});
console.log("Duration for rate limit: " + process.env.rate_limit_duration);
console.log("Amount per duration: " + process.env.user_rate_limit);
console.log("Using HTTPS: " + process.env.https);
if (process.env.https == "yes") {
    const ca = fs.readFileSync('/etc/letsencrypt/live/' + server_name + '/fullchain.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/' + server_name + '/cert.pem', 'utf8');
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/' + server_name + '/privkey.pem', 'utf8');
    const credentials = {key: privateKey,cert: certificate,ca: ca};
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
app.use(limiter);
// TODO install CSP and do not set this to false, this was just for testing
//app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.post('/transfer/:recipient_address', function(req, res){
  var response = '';
  console.log('Transfer');
  var recipientAddress = req.params.recipient_address;
  console.log("Recipient address: " + recipientAddress);
  var faucetPublicKey = process.env.faucet_public_key;
  var faucetPrivateKey = process.env.faucet_private_key;
  var blockchainChainId = process.env.blockchain_chain_id;
  var gasPrice = process.env.gas_price;
  var gasLimit = process.env.gas_limit;
  var tokenAmountInWei = process.env.token_amount_in_wei;
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
                  response = "Success" + signed_tx.transactionHash;
                  console.log(signed_tx.transactionHash);
              } else {
                response = "Send signed transaction failed: " + error;
                console.log("*\nSend signed transaction failed: " + error);
              }
          });
      } else {
          console.log(error);
      }
  });
  res.send(response);
});

/**
 * Server Activation
 */

if (process.env.https == "yes") {
    https.createServer(credentials, app).listen(port, process.env.host, () => {
    console.log("Welcome to faucet");
});
} else if (process.env.https == "no"){
        app.listen(server_port, () => {
        console.log(`Listening to requests on http://localhost:${server_port}`);
    });
} else {
    console.log("ERROR: Please set the https setting in the .env config file");
}
