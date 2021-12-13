# PRIVATE - Timelock token User Interface (UI)

# What does it do?

Interacts with the timelock token which allows users to transfer tokens after a certain timespan has elapsed.

# How do end users interact with the timelock UI

Users simply enter their Ethereum mainnet address and click the transfer button. If tokens have cleared the vesting period then tokens will be transferred. If tokens are still locked, the user will get a Toastify message explaining the timelock.

![Screen Shot 2021-12-14 at 9 28 02 am](https://user-images.githubusercontent.com/9831342/145905502-c8a33759-b73e-4b82-aab4-b28524883e11.png)

# Where is the timelock smart contract

The [timelock smart contract](https://github.com/ParaState/timelock-token-deployment/blob/main/Timelock.sol) is deployed on the Ethereum mainnet and then this UI source code us updated with the timelocks ABI, bytecode, contract address and deployment transaction hash. This timelock UI instantiates the timelock contract in order to interact and transfer tokens to end users and so forth.

# How to deploy the UI

**Ubuntu example**

```bash
sudo apt update
sudo apt install nodejs npm
```

### Fetch the code

```bash
cd /media/nvme/
git clone https://github.com/ParaState/timelock-token-user-interface.git
```

Change directories

```bash
cd timelock-token-user-interface
```

### Configure 

Create a new file called `.env` and add the following text (fill out your specific config options). Notice the requirements to enter details about where the [timelock smart contract](https://github.com/ParaState/timelock-token-deployment/blob/main/Timelock.sol) was deployed i.e. contract address and so forth.

```python
# This private key is highly sensitive because it controls all functions that are onlyOwner i.e. can transfer all funds
contract_private_key=
contract_public_key=
blockchain_rpc= "Enter Ethereum RPC endpoint here"
blockchain_chain_id=1
# How many times a user can use this server per duration period
user_rate_limit=5
# The duration period in minutes i.e. 1440 is 24 hours
rate_limit_duration=5
blockchain_logo_url=https://pbs.twimg.com/profile_images/1357246244540751873/zhVBBG5-_400x400.jpg

blockchain_block_explorer_url=https://etherscan.io/
# URL and path to address/account, include trailing slash i.e. https://explore.io/address/
blockchain_block_explorer_address_url=https://etherscan.io/address/
# URL and path to transaction/tx etc, including trailing slash i.e. https://explore.io/tx/
blockchain_block_explorer_transaction_url=https://etherscan.io/tx/
# Override gas price
gas_price=5000000000
# Override gas limit
gas_limit=8000000
# Flavour of client's web3 i.e. oeth (Oasis Ethereum), cmt (CyberMiles), eth (Ethereum), state (ParaState), dot (Polkadot)
web3_flavour=eth
server_name=localhost
server_port=8002
# Are you using HTTPS (letsencrypt)? yes/no
https=yes
host=0.0.0.0
# data_dir=/home/azureuser/timelock-data
data_dir=/media/nvme/timelock-data
timelock_name=
timelock_address=
timelock_tx=
```

### Data directory

Create a data directory which is the same as what you just set in the `.env` file

```bash
sudo mkdir -p /media/nvme/timelock-data
sudo chown -R $USER:$USER /media/nvme/timelock-data
```

### Create the data files

```bash
touch /media/nvme/timelock-data/data.txt
```

### Install node dependencies automatically

```bash
npm install
```

### Start

```bash
npm run prod
```

## Development

If you would like to contribute to this project and you don't want your `.env` file to be pushed to this repo, please run the following commands. 

```bash
git rm .env --cached
git commit -m "Stopped tracking .env File"
```

## Hosting Node using SSL

If you would like to host this as a stand alone timelock for your own project it is advised that you use letsencrypt and provide users with https address (as apposed to just hosting locally via http for testing and dev purposes).

First install these packages on Ubuntu operating system.

```bash
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y certbot
```

Create a new directory for the letsencrypt certificates

```bash
sudo mkdir /etc/letsencrypt
sudo chown $USER:$USER -R /etc/letsencrypt
```

Part of the verification of letsencrypt requires that you host a text file at a specific location on the server. The quickest way to do this is to install apache2 and use /var/www/html path on the server.

First install apache2

```bash
sudo apt install apache2
```

Then log into your server with another session (so you can perform the validation whilst also writing to www/html dir) 

Once you have two sessions open, run the following command to create and verify the certificates. It is just a matter of following the prompts.

```bash
sudo certbot certonly --manual
```

Certbot will provide you with some text data and a URL, you must follow the prompts as roughly outlined below.

Create a file containing just the data provided to you (let's pretend the data was `asdfasdf`):

Then make that data available on your web server at the URL provided to you, let just pretend that this is the URL provided i.e. ending in `asdf`.

```
By now you have essentially written the data provided by the `certbot` command to the file path provided by the `certbot` command.

```bash
sudo mkdir -p .well-known/acme-challenge
vi asdf
```

For example, enter the text `asdfasdf` and save `asdf` file.

You will also need to open port 80 so that `certbot` can see the data in that file.

Then press enter to continue in the `certbot` terminal so that certbot can go ahead and get that acme-challenge (verification) finished.

When the verification is finished you will need to update the ownership of the new certificates in the letsencrypt location (because they were written by root not your user). Simply do the following (to prevent an error like this `Error: EACCES: permission denied, open '/etc/letsencrypt` when starting the timelock)

```bash
sudo chown $USER:$USER -R /etc/letsencrypt
```
## Ensuring uptime

Go ahead and create a file called `start_timelock.sh` in a specific location i.e. `/a_path_to/start_timelock.sh`. 

Paste in the following script but ensure that your `timelock-token-user-interface` path is correct and also that your `/home/tpmccallum/.npm-global/bin/forever` path is correct. Hint type `which forever` to see where it is installed on your machine.

```bash
#!/bin/bash
cd /media/nvme/timelock-token-user-interface
/home/tpmccallum/.npm-global/bin/forever start index.js
```

You can then go ahead and create a file called `check_timelock.sh` and fill it with the following. Again, please check your paths because they will be different to these.

```bash
#!/bin/bash
SS_TIMELOCK=$(ps -ax | grep -c "/media/nvme/timelock-token-user-interface/index.js")
if [ $SS_TIMELOCK -gt 1 ] 
then
    echo $(date)
else
    echo "Starting, please wait ..."
    ( exec "/a_path_to/start_timelock.sh" )
    echo "Success!"  
fi
```

Now make both of these files executable.

```bash
sudo chmod a+x start_timelock.sh
sudo chmod a+x check_timelock.sh
```

The last step is to add the automatic execution of these scripts to cron

```bash
crontab -e
```

Then insert the following lines (making sure that your paths are correct, because the following example is probably not correct for your system)

```bash
* * * * * /a_path_to/check_timelock.sh  > /a_path_to/timelock_log.txt 2>&1
```

If the timelock is not running it will start it. If the timelock is running it will just record the date to the file. It does not append; it overwrites. Essentially the `/a_path_to/timelock_log.txt` will have a single line in it at all times (showing the date of the last uptime).

