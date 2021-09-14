require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.blockchain_rpc));
var nonce;
web3.eth.getTransactionCount(process.env.faucet_public_key, "pending", function(err, res) {
  nonce = res;
  console.log("Nonce: " + nonce);

  var transactionObject2 = {
    nonce: nonce,
    chainId: process.env.blockchain_chain_id,
    from: process.env.faucet_public_key,
    gasPrice: process.env.gas_price,
    gas: process.env.gas_limit,
    to: "0x54ad0a500D7689279e1Ff96283716116c4AbB378",
    value: process.env.token_amount_in_wei,
  }

  web3.eth.accounts.signTransaction(transactionObject2, process.env.faucet_private_key, function(error3, signed_tx2) {
    if (!error3) {
      console.log("Transaction signed, no error: " + signed_tx2);
    }
    web3.eth.sendSignedTransaction(signed_tx2.rawTransaction, function(error4, sent_tx2) {
      if (!error4) {
        console.log("Transaction signed, no error: " + sent_tx2);
      }
    });
  });
});