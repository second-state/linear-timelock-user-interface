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
    constructor(){
        this.balanceBefore;
        this.balanceAfter;
        // Failsafe
        this.alreadyFunded = true;
        this.contractBlockNumber = 0;
        this.latestBlockNumber;
    }

    getBalanceBefore(){
        return this.balanceBefore;
    }
    getBalanceAfter(){
        return this.balanceAfter;
    }
    getAlreadyFunded(){
        return this.alreadyFunded;
    }
    getContractBlockNumber(){
        return this.contractBlockNumber;
    }
    getLatestBlockNumber(){
        return this.latestBlockNumber;
    }
    setBalanceBefore(_balanceBefore){
        this.balanceBefore = _balanceBefore;
    }
    setBalanceAfter(_balanceAfter){
        this.balanceAfter = _balanceAfter
    }
    setAlreadyFunded(_status){
        this.alreadyFunded = _status;
    }
    setContractBlockNumber(_block){
      this.contractBlockNumber = _block;
    }
    setLatestBlockNumber(_latest){
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
        _account_state.setBalanceBefore(res);
      } else {
        if (_before_or_after == "after") {
          _account_state.setBalanceAfter(res);
        }
      }
    } else {
      console.log("Error: ", err)
    }
  });
}

async function getLogs(_contract_instance, _address, _account_state) {
  //Failsafe - set to true
  _account_state.setAlreadyFunded(true);
    var incrementer = _account_state.getContractBlockNumber();
    var lower;
    var upper;
    var fin = false;
    while (fin == false) {
      if (incrementer + 100 <= _account_state.getLatestBlockNumber()) {
        lower = incrementer;
        upper = incrementer + 100;
      } else {
        lower = incrementer;
        upper = _account_state.getLatestBlockNumber();
        fin = true;
      }
      console.log("Check logs between block " + lower + " and block " + upper + ".");
      var events = await _contract_instance.getPastEvents('Transfer', {
        filter: {
          to: _address,
        },
        fromBlock: lower,
        toBlock: upper,
      }, (error, events) => {
        if (!error) {
          if (events.length > 0) {
            _account_state.setAlreadyFunded(true);
            fin = true;
            console.log("Found a log");
          } else {
            if (events.length == 0) {
              _account_state.setAlreadyFunded(false);
            }
            console.log("No logs yet ...");
            incrementer = incrementer + 100;
          }
        }
      })
    }
}
/** 
 * ERC20 Variables
 */
// updated to 30k supply 3rd sep
const erc20_abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseApproval",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseApproval",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "constant": false
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Pause",
    "type": "event",
    "constant": false
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Unpause",
    "type": "event",
    "constant": false
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event",
    "constant": false
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event",
    "constant": false
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event",
    "constant": false
  }
]

const erc20_bytecode = "0x60806040526000600360146101000a81548160ff0219169083151502179055506040805190810160405280600681526020017f6353544154450000000000000000000000000000000000000000000000000000815250600490805190602001906200006c92919062000168565b506040805190810160405280600381526020017f435354000000000000000000000000000000000000000000000000000000000081525060059080519060200190620000ba92919062000168565b50601260065569065a4da25d3016c00000600755348015620000db57600080fd5b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506007546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555062000217565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001ab57805160ff1916838001178555620001dc565b82800160010185558215620001dc579182015b82811115620001db578251825591602001919060010190620001be565b5b509050620001eb9190620001ef565b5090565b6200021491905b8082111562000210576000816000905550600101620001f6565b5090565b90565b61176e80620002276000396000f3006080604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100eb578063095ea7b31461017b57806318160ddd146101e057806323b872dd1461020b578063313ce567146102905780633f4ba83a146102bb5780635c975abb146102d2578063661884631461030157806370a08231146103665780638456cb59146103bd5780638da5cb5b146103d457806395d89b411461042b578063a9059cbb146104bb578063d73dd62314610520578063dd62ed3e14610585578063f2fde38b146105fc575b600080fd5b3480156100f757600080fd5b5061010061063f565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610140578082015181840152602081019050610125565b50505050905090810190601f16801561016d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561018757600080fd5b506101c6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106dd565b604051808215151515815260200191505060405180910390f35b3480156101ec57600080fd5b506101f561070d565b6040518082815260200191505060405180910390f35b34801561021757600080fd5b50610276600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610713565b604051808215151515815260200191505060405180910390f35b34801561029c57600080fd5b506102a5610745565b6040518082815260200191505060405180910390f35b3480156102c757600080fd5b506102d061074b565b005b3480156102de57600080fd5b506102e761080b565b604051808215151515815260200191505060405180910390f35b34801561030d57600080fd5b5061034c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061081e565b604051808215151515815260200191505060405180910390f35b34801561037257600080fd5b506103a7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061084e565b6040518082815260200191505060405180910390f35b3480156103c957600080fd5b506103d2610896565b005b3480156103e057600080fd5b506103e9610957565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561043757600080fd5b5061044061097d565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610480578082015181840152602081019050610465565b50505050905090810190601f1680156104ad5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104c757600080fd5b50610506600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a1b565b604051808215151515815260200191505060405180910390f35b34801561052c57600080fd5b5061056b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a4b565b604051808215151515815260200191505060405180910390f35b34801561059157600080fd5b506105e6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a7b565b6040518082815260200191505060405180910390f35b34801561060857600080fd5b5061063d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b02565b005b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106d55780601f106106aa576101008083540402835291602001916106d5565b820191906000526020600020905b8154815290600101906020018083116106b857829003601f168201915b505050505081565b6000600360149054906101000a900460ff161515156106fb57600080fd5b6107058383610c5a565b905092915050565b60075481565b6000600360149054906101000a900460ff1615151561073157600080fd5b61073c848484610d4c565b90509392505050565b60065481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107a757600080fd5b600360149054906101000a900460ff1615156107c257600080fd5b6000600360146101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b600360149054906101000a900460ff1681565b6000600360149054906101000a900460ff1615151561083c57600080fd5b61084683836110d6565b905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108f257600080fd5b600360149054906101000a900460ff1615151561090e57600080fd5b6001600360146101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a135780601f106109e857610100808354040283529160200191610a13565b820191906000526020600020905b8154815290600101906020018083116109f657829003601f168201915b505050505081565b6000600360149054906101000a900460ff16151515610a3957600080fd5b610a438383611357565b905092915050565b6000600360149054906101000a900460ff16151515610a6957600080fd5b610a738383611556565b905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b5e57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610b9a57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610d8957600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610dd657600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610e6157600080fd5b816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050808311156111e7576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061126b565b828103600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561139457600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156113e157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a360019050929150505600a165627a7a72305820fc23d9eaa5dad5a0b35164766d2207fe29884a7ecce2215b1878f0756d35c2060029";

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
        erc20_token_amount_in_wei: process.env.erc20_token_amount_in_wei,
        rate_limit_duration: process.env.rate_limit_duration,
        twitter_handle: process.env.twitter_handle,
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



app.post('/api/twitter/:tweet_id', function(req, res) {
  var blockchainBlockExplorerAddressUrl = process.env.blockchain_block_explorer_address_url
  var blockchainBlockExplorerTransactionUrl = process.env.blockchain_block_explorer_transaction_url
  var faucetPublicKey = process.env.faucet_public_key;
  var faucetPrivateKey = process.env.faucet_private_key;
  var blockchainChainId = process.env.blockchain_chain_id;
  var gasPrice = process.env.gas_price;
  var gasLimit = process.env.gas_limit;
  var tokenAmountInWei = process.env.token_amount_in_wei;
  var erc20TokenAmountInWei = process.env.erc20_token_amount_in_wei;
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
            duration = parseInt(rObject.duration);
            times = parseInt(rObject.times);
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
                // Add logic for AccountDetails here
                //**************************************************************

                // Account details
                var accountState = new AccountState();
                web3.eth.getTransaction(process.env.erc20_tx).then(result => {
                  accountState.setContractBlockNumber(result.blockNumber);
                  console.log("Contract block number set to " + accountState.getContractBlockNumber());
                  web3.eth.getBlockNumber().then(lbn => {
                    accountState.setLatestBlockNumber(lbn);
                    console.log("Latest block number set to " + accountState.getLatestBlockNumber());
                  });
                });

                // ERC20 token variables
                contract_address = process.env.erc20_address;
                console.log("Contract address: " + contract_address);
                contract = new web3.eth.Contract(erc20_abi, contract_address);
                //console.log("Contract: " + contract);
                getLogs(contract, recipientAddress, accountState).then(result => {
                  if (accountState.getAlreadyFunded() == false) {

                    //**************************************************************
                    var cacheObjectToStore = {};
                    cacheObjectToStore["duration"] = new_timestamp;
                    cacheObjectToStore["times"] = times + 1;
                    myCache.set(handle, cacheObjectToStore, 0);
                    fs.appendFile(path.join(process.env.data_dir, "data.txt"), handle + "," + new_timestamp + "," + times + '\n', function(err) {
                      if (err) throw err;
                      console.log("Updated timestamp saved");
                    });


                    // ERC20 token variables
                    sender = process.env.faucet_public_key;
                    console.log("Sender: " + sender);
                    var transferObjectEncoded = contract.methods.transfer(recipientAddress, web3.utils.fromWei(erc20TokenAmountInWei, 'ether')).encodeABI();
                    // Create transaction object
                    var transactionObject = {
                      to: contract_address,
                      from: sender,
                      gasPrice: gasPrice,
                      gas: gasLimit,
                      data: transferObjectEncoded
                    };

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
                      text: "Sorry, the address of " + recipientAddress + " has already been funded.",
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

/* This is an endpoint which is deprecated
// This endpoint can be revived if you want to give tokens directly to an address (not via social media)
// Note - rate limiting needs to be implemented for this endpoint because it was only used as test in initial code (incomplete)
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

*/

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
        console.log("Unable to access Twitter at this stage in time ... rate limit issue at Twitter");
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
        /*
        doTheyFollow().then(followResult => {
            console.log('Checking followers, please wait ...');
        });
        // Repeat the follower harvest automatically now on; at time intervals
        seeWhoFollows();
        
        */
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

console.log("Starting Telegram Bot");

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.telegram_bot_token;
const bot = new TelegramBot(token, {
  polling: true
});
console.log("Config set");

/*

// Specific command where the user types in /faucet followed by a message

// This endpoint was originally for dispensing network tokens NOT ERC20
// This endpoint has been deprecated
// This endpoint can be revived if you want to dispence network tokens
// Note - please check the logic and rate limiting etc. before reviving for use

bot.onText(/\/faucet (.+)/, (msg, match) => {
  console.log("here");
  // The user's id who sent the command
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  console.log("ChatId: " + chatId);
  console.log("Message object is :" + JSON.stringify(msg));

  // The message which they sent
  const resp = match[1]

  // Variables for the transaction
  var rate_limit_duration = process.env.rate_limit_duration;
  var user_rate_limit = process.env.user_rate_limit;
  var blockchainBlockExplorerAddressUrl = process.env.blockchain_block_explorer_address_url;
  var blockchainBlockExplorerTransactionUrl = process.env.blockchain_block_explorer_transaction_url;
  var faucetPublicKey = process.env.faucet_public_key;
  var faucetPrivateKey = process.env.faucet_private_key;
  var blockchainChainId = process.env.blockchain_chain_id;
  var gasPrice = process.env.gas_price;
  var gasLimit = process.env.gas_limit;
  var tokenAmountInWei = process.env.token_amount_in_wei;
  var ethRegex = /0x[a-fA-F0-9]{40}/;
  var goodToGo = false;
  var response;
  var text;
  text = resp;
  var new_timestamp = Math.floor(new Date().getTime() / 1000);
    // Rate limit data
    var duration;
    var times;
    var rObject = myCache.get(fromId);
    if (rObject == undefined) {
      duration = new_timestamp;
      times = 0;
    } else {
      duration = parseInt(rObject.duration);
      times = parseInt(rObject.times);
    }
    if ((new_timestamp - duration) > (parseInt(rate_limit_duration) * 60)) {
      times = 0;
    }
    new_times = times + 1;
    console.log("Checking new times: " + new_times + " vs limit of " + user_rate_limit);
    console.log("*** Good to go: " + goodToGo);
    if (new_times <= parseInt(user_rate_limit)) {
      goodToGo = true;
    }

      var cacheObjectToStore = {};
      cacheObjectToStore["duration"] = new_timestamp;
      cacheObjectToStore["times"] = new_times;
      myCache.set(fromId, cacheObjectToStore, 0);
      removeLine(fromId);
      fs.appendFile(path.join(process.env.data_dir, "data.txt"), fromId + "," + new_timestamp + "," + new_times + '\n', function(err) {
        if (err) throw err;
        console.log("Updated timestamp saved");
      });

  console.log("Text: " + text);
  var resultRegex = ethRegex.exec(text);
  console.log("Eth address: " + resultRegex);


    if (rObject == undefined || goodToGo == true) {
          if (resultRegex != null) {
    var recipientAddress = resultRegex[0];
      if (Web3.utils.isAddress(recipientAddress)) {
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
                bot.sendMessage(chatId, "Transaction sent " + tokenAmountInWei + " Wei, to address: " + recipientAddress + ". See " + blockchainBlockExplorerTransactionUrl + signed_tx.transactionHash + " for more info.");
              } else {
                bot.sendMessage(chatId, "Sorry! Transaction failed, please try again soon!");
              }
            });
          } else {
            console.log(error);
          }
        });

      } else {
        bot.sendMessage(chatId, "Address is not valid!");
      }
        } else {
    bot.sendMessage(chatId, "Address is not valid!");
  }
    } else {
      bot.sendMessage(chatId, "Sorry, rate limit, you can only have " + user_rate_limit + " request[s], every " + rate_limit_duration + " minute[s].");
    }
});
*/


/* cSTATE

*/
// A bot command that gives the balance of an external address

bot.onText(/\/balance_cstate (.+)/, (msg, match) => {
  // Account details
  var accountState = new AccountState();
  web3.eth.getTransaction(process.env.erc20_tx).then(result => {
    accountState.setContractBlockNumber(result.blockNumber);
    console.log("Contract block number set to " + accountState.getContractBlockNumber());
    web3.eth.getBlockNumber().then(lbn => {
      accountState.setLatestBlockNumber(lbn);
      console.log("Latest block number set to " + accountState.getLatestBlockNumber());
    });
  });
  console.log("here");
  // The user's id who sent the command
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const userName = msg.from.username;
  const firstName = msg.from.first_name;
  //console.log("ChatId: " + chatId);
  //console.log("Message object is :" + JSON.stringify(msg));

  // The message which they sent
  const resp = match[1];
  var text;
  text = resp;
  var ethRegex = /0x[a-fA-F0-9]{40}/;
  var resultRegex = ethRegex.exec(text);
  if (resultRegex != null) {
    var recipientAddress = resultRegex[0];
      if (Web3.utils.isAddress(recipientAddress)) {
        console.log("Recipient address: " + recipientAddress);
        // ERC20 token variables
        contract_address = process.env.erc20_address;
        console.log("Contract address: " + contract_address);
        contract = new web3.eth.Contract(erc20_abi, contract_address);
        console.log("Contract: " + contract);
        getBalance(contract, recipientAddress, accountState, "after").then(result => {
            bot.sendMessage(chatId, "Address " + recipientAddress + " has " + accountState.getBalanceAfter() + " cState tokens!");
        });
      } else {
        bot.sendMessage(chatId, "Address is not valid!");
      }
  } else {
    bot.sendMessage(chatId, "Address is not valid!");
  }
});

// Respond to any message with drip_cstate in the text

bot.onText(/^(\/drip_cstate(.*)|(.*)drip_cstate(.*))/, (msg, match) => {
  // The user's id who sent the command
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const userName = msg.from.username;
  const firstName = msg.from.first_name;
  const text = msg.text;
  console.log("Message object is :" + JSON.stringify(msg));






  // The message which they sent
  //const resp = match[1]
  //console.log("Resp :" + JSON.stringify(resp));

  // Variables for the transaction
  var rate_limit_duration = process.env.rate_limit_duration;
  var user_rate_limit = process.env.user_rate_limit;
  var blockchainBlockExplorerAddressUrl = process.env.blockchain_block_explorer_address_url;
  var blockchainBlockExplorerTransactionUrl = process.env.blockchain_block_explorer_transaction_url;
  var faucetPublicKey = process.env.faucet_public_key;
  var faucetPrivateKey = process.env.faucet_private_key;
  var blockchainChainId = process.env.blockchain_chain_id;
  var gasPrice = process.env.gas_price;
  var gasLimit = process.env.gas_limit;
  var tokenAmountInWei = process.env.token_amount_in_wei;
  var erc20TokenAmountInWei = process.env.erc20_token_amount_in_wei;
  var ethRegex = /0x[a-fA-F0-9]{40}/;
  var goodToGo = false;
  var response;
  var new_timestamp = Math.floor(new Date().getTime() / 1000);
  // Rate limit data
  var duration;
  var times;
  var rObject = myCache.get(fromId);
  if (rObject == undefined) {
    duration = new_timestamp;
    times = 0;
  } else {
    duration = parseInt(rObject.duration);
    times = parseInt(rObject.times);
  }
  if ((new_timestamp - duration) > (parseInt(rate_limit_duration) * 60)) {
    times = 0;
  }
  new_times = times + 1;
  console.log("Checking new times: " + new_times + " vs limit of " + user_rate_limit);
  console.log("*** Good to go: " + goodToGo);
  if (new_times <= parseInt(user_rate_limit)) {
    goodToGo = true;
  }

  var cacheObjectToStore = {};
  cacheObjectToStore["duration"] = new_timestamp;
  cacheObjectToStore["times"] = new_times;
  myCache.set(fromId, cacheObjectToStore, 0);
  removeLine(fromId);
  fs.appendFile(path.join(process.env.data_dir, "data.txt"), fromId + "," + new_timestamp + "," + new_times + '\n', function(err) {
    if (err) throw err;
    console.log("Updated timestamp saved");
  });

  console.log("Text: " + text);
  var resultRegex = ethRegex.exec(text);
  console.log("Eth address: " + resultRegex);


  if (rObject == undefined || goodToGo == true) {
    if (resultRegex != null) {
      var recipientAddress = resultRegex[0];
      if (Web3.utils.isAddress(recipientAddress)) {
        console.log("Recipient address: " + recipientAddress);

        // Account details
        var accountState = new AccountState();
        web3.eth.getTransaction(process.env.erc20_tx).then(result => {
          accountState.setContractBlockNumber(result.blockNumber);
          console.log("Contract block number set to " + accountState.getContractBlockNumber());
          web3.eth.getBlockNumber().then(lbn => {
            accountState.setLatestBlockNumber(lbn);
            console.log("Latest block number set to " + accountState.getLatestBlockNumber());
          });
        });

        // ERC20 token variables
        contract_address = process.env.erc20_address;
        console.log("Contract address: " + contract_address);
        contract = new web3.eth.Contract(erc20_abi, contract_address);
        console.log("Contract: " + contract);

        // Get before balance
        getBalance(contract, recipientAddress, accountState, "before").then(result => {
          console.log("Checking account balance before transaction");
          getLogs(contract, recipientAddress, accountState).then(result => {
            if (accountState.getAlreadyFunded() == false){
            bot.sendMessage(chatId, "Hey " + firstName + " (" + userName + "), just checking your cState balance, gimme one second ..." + "\n\nOk, " + firstName + " you currently have " + accountState.getBalanceBefore() + " cState\nAttempting to transfer " + web3.utils.fromWei(erc20TokenAmountInWei, 'ether') + " cSTATE now ... please wait a minute!");

            // ERC20 token variables
            sender = process.env.faucet_public_key;
            console.log("Sender: " + sender);
            var transferObjectEncoded = contract.methods.transfer(recipientAddress, web3.utils.fromWei(erc20TokenAmountInWei, 'ether')).encodeABI();
            // Create transaction object
            var transactionObject = {
              to: contract_address,
              from: sender,
              gasPrice: gasPrice,
              gas: gasLimit,
              data: transferObjectEncoded
            };
            web3.eth.accounts.signTransaction(transactionObject, faucetPrivateKey, function(error, signed_tx) {
              if (!error) {
                web3.eth.sendSignedTransaction(signed_tx.rawTransaction, function(error, sent_tx) {
                  if (!error) {
                    setTimeout(function() {
                      web3.eth.getTransaction(sent_tx.toString(), function(error, tx_object) {
                        if (!error) {
                          // Get before balance
                          setTimeout(function() {
                            getBalance(contract, recipientAddress, accountState, "after").then(result => {
                              console.log("Checking account balance after transaction");
                              bot.sendMessage(chatId, "Balance before was: " + accountState.getBalanceBefore() + "\nThen transaction sent " + web3.utils.fromWei(erc20TokenAmountInWei, 'ether') + " cSTATE, \nto address: " + recipientAddress + "\nBalance after is now: " + accountState.getBalanceAfter() + "\n\nSee " + blockchainBlockExplorerTransactionUrl + signed_tx.transactionHash + " for more info. \n\nBy the way, you can check your cSTATE balance by typing /balance_cstate followed by your address!");
                            });
                          }, 1000);
                        } else {
                          console.log(error);
                        }
                      });
                    }, 5000);

                  } else {
                    bot.sendMessage(chatId, "Sorry! Transaction failed, please try again soon!");
                  }
                });
              } else {
                console.log(error);
              }
            });
        } else {
            bot.sendMessage(chatId, "Sorry! The address " + recipientAddress + " has already been funded. You have hit the rate limit.");
        }
          });
        
        });

      } else {
        bot.sendMessage(chatId, "Address is not valid!");
      }
    } else {
      bot.sendMessage(chatId, "Address is not valid!");
    }
  } else {
    bot.sendMessage(chatId, "Sorry, rate limit, you can only have " + user_rate_limit + " request[s], every " + rate_limit_duration + " minute[s].");
  }
});