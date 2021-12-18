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

// A class that manages external account details (so that async web3 calls can temporarily store info)
class AccountState {
  constructor() {
    this.balanceBefore;
    this.balanceAfter;
    // Failsafe
    this.alreadyFunded = true;
    this.contractBlockNumber = 0;
    this.latestBlockNumber;
  }

  getBalanceBefore() {
    return this.balanceBefore;
  }
  getBalanceAfter() {
    return this.balanceAfter;
  }
  getAlreadyFunded() {
    return this.alreadyFunded;
  }
  getContractBlockNumber() {
    return this.contractBlockNumber;
  }
  getLatestBlockNumber() {
    return this.latestBlockNumber;
  }
  setBalanceBefore(_balanceBefore) {
    this.balanceBefore = _balanceBefore;
  }
  setBalanceAfter(_balanceAfter) {
    this.balanceAfter = _balanceAfter
  }
  setAlreadyFunded(_status) {
    this.alreadyFunded = _status;
  }
  setContractBlockNumber(_block) {
    this.contractBlockNumber = _block;
  }
  setLatestBlockNumber(_latest) {
    this.latestBlockNumber = _latest
  }
}

/**
 * Helper functions
 */

// A helper function which checks the balance of an external account
// _contract_instance = a web3 new Contract instance
// _address = the contract address where the ERC20 token was deployed
// _account_state = an instance of the AccountState class above
// _before_or_after = text "before" or "after" which indicates which getters/setters of AccountState to use
async function getBalance(_contract_instance, _address, _account_state, _before_or_after) {
  const result = await _contract_instance.methods.balanceOf(_address).call(function(err, res) {
    if (!err) {
      if (_before_or_after == "before") {
        _account_state.setBalanceBefore(web3.utils.fromWei(res, 'ether'));
      } else {
        if (_before_or_after == "after") {
          _account_state.setBalanceAfter(web3.utils.fromWei(res, 'ether'));
        }
      }
    } else {
      console.log("Error: ", err)
    }
  });
}
/** 
 * ERC20 Variables
 */
// updated to 30k supply 3rd sep
//TODO add contract ABI
const timelock_abi = '';
const timelock_bytecode = '';

const erc20_name = process.env.erc20_name;
const erc20_symbol = process.env.erc20_symbol;
const erc20_address = process.env.erc20_address;


/**
 * App Variables
 */
const twitter_token = process.env.twitter_bearer_token;

var listOfFollowers = [];

const app = express();
const server_name = process.env.server_name;
const server_port = process.env.server_port || "8001";
var user_rate_limit = process.env.user_rate_limit;
var rate_limit_duration = process.env.rate_limit_duration;

var aUsersAccountRateLimit = process.env.a_users_account_rate_limit;
var aUsersAccountRateDuration = process.env.a_users_account_rate_duration;

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
app.use("/transfer/", web_page_limiter);
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
  var direct = "Click to visit <a href=\"https://" + process.env.server_name + ":" + process.env.server_port + "/transfer\" target=\"_blank\"> :8002/transfer </a>";
  res.send(direct);
});

app.get("/transfer", (req, res) => {
  res.render("index", {
    title: "Home",
    timelock_address: process.env.timelock_address,
    rate_limit_duration: process.env.rate_limit_duration,
    user_rate_limit: process.env.user_rate_limit,
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

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



/**
 * Server Activation
 */
if (process.env.https == "yes") {
    https.createServer(credentials, app).listen(server_port, process.env.host, () => {
        console.log("Welcome to timelock; using https");
        console.log("Host:" + process.env.host + "\nPort: " + server_port);
    });
} else if (process.env.https == "no") {
    app.listen(server_port, () => {
        console.log(`Listening to requests on http://localhost:${server_port}`);



    });
} else {
    console.log("ERROR: Please set the https setting in the .env config file");
}

/* Node Cache Start
 */
const NodeCache = require("node-cache");

// DATA.TXT
const myCache = new NodeCache();

// START Load data from data file
const readInterface = readline.createInterface({
  input: fs.createReadStream(path.join(process.env.data_dir, 'data.txt')),
  output: false,
  console: false
});
