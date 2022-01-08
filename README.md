# PRIVATE - Timelock token User Interface (UI)

# What does it do?

Interacts with the timelock token which allows users to transfer tokens after a certain timespan has elapsed.

# How do end users interact with the timelock UI

Users simply enter their Ethereum mainnet address and click the transfer button. If tokens have cleared the vesting period then tokens will be transferred. If tokens are still locked, the user will get a Toastify message explaining the timelock.

![Screen Shot 2021-12-24 at 3 03 02 pm](https://user-images.githubusercontent.com/9831342/147318686-6697dff3-65b1-46b5-a3da-993bb864858e.png)

# Where is the timelock smart contract

The [timelock smart contract](https://github.com/ParaState/timelock-token-deployment/blob/main/Timelock.sol) is deployed on the Ethereum mainnet and then this UI source code us updated with the timelocks ABI, bytecode, contract address and deployment transaction hash. This timelock UI instantiates the timelock contract in order to interact and transfer tokens to end users and so forth.

# How to deploy this UI

Clone this repository

```
git clone git@github.com:second-state/timelock-token-user-interface.git
```

Then simply type

```
npm run deploy
```

The site will then be hosted to [https://second-state.github.io/timelock-token-user-interface/html/](https://second-state.github.io/timelock-token-user-interface/html/)
