# Linear timelock token User Interface (UI)

# What does it do?

Interacts with the linear timelock smart contract, which allows users to linearly unlock tokens.

![linear-timelock](https://user-images.githubusercontent.com/9831342/150708583-bd727000-3b9f-4f02-af2e-958774f0d8a3.jpg)

# How do end users interact with the timelock UI

Users simply load the page, (the user's account details are automatically pre-filled in the address input box). 

The user's available (un-lockable) balance is calculated automatically. 

The user then simply clicks the "Unlock Your Tokens" button (please note: the maximum amount of available tokens are automatically pre-filled in the amount input box). 

It is recommended to also click the "Refresh/Calculate Balances" button after any transfers.

![Screen Shot 2022-01-10 at 7 20 09 am](https://user-images.githubusercontent.com/9831342/148701427-3217e79a-3e02-4b71-b4b1-20d93729ac94.png)

# Where is the linear timelock smart contract

The [timelock smart contract](https://github.com/second-state/linear-timelock-smart-contract/) is deployed on the Ethereum mainnet and then this UI source code us updated with the timelocks ABI, bytecode, contract address and deployment transaction hash. This timelock UI instantiates the timelock contract in order to interact and transfer tokens to end users and so forth.

# How to deploy this UI

Clone this repository

```
git clone git@github.com:second-state/linear-timelock-user-interface.git
```

## ABI and address of Timelock

Paste the ABI **and the address** of the linear timelock's successfully deployed contract instance, into the helper.js file

## Contract address of ERC20 (NOT timelock)

In addition to that, also paste the contract address of the **ERC20 contract** into the helper.js file. You will see the two addresses are clearly marked.

## Installing

Then simply type

```
npm install
```

## Running

### Localhost for testing

To test on local hardware (localhost) simply type

```
node server.js
```

### Publish externally

**Please note:** A disclaimer may be required, whereby the user must accept in order to unlock tokens. If this is the case then a disclaimer needs to be implemented in the UI. In addition the wording for the disclaimer has to be added to the code. The operation of the disclaimer needs to be tested before the UI is publicly deployed.

An example of how a disclaimer was recently implemented in Simple Timelock UI can be found at the following GitHub commit. A change to the HTML button, some inline HTML text and additional CSS are required (as shown in the commit details in the following link)
https://github.com/second-state/claim-parastate-erc20-token_locking-na_cliff-na_vesting-na/commit/2d59a91812be4fe482ba42f48dddd41d9730ea2b

Also, please attend to any open issues in this repository to ensure correct and optimal operation.

To publish/deploy at GitHub pages, open `package.json` and edit accordingly, then simply type

```
npm run deploy
```

The site will then be hosted to [https://second-state.github.io/linear-timelock-user-interface/html/](https://second-state.github.io/linear-timelock-token-user-interface/html/)
