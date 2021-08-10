# Universal Faucet (for Ethereum compatible blockchain networks)

# What does it do?

This software provides Ethereum compatible blockchain tokens; think of this as a "Faucet as a Service".
It provides a web page interface (where users can paste in their public key).
It also provides an RPC endpoint (which can be called manually or programatically).
This software has specific rate limiting built in.
Just as with settings like `token_amount_in_wei`, `blockchain_rpc`, `blockchain_chain_id` and so forth, the aforementioned rate limiting (`user_rate_limit` & `rate_limit_duration` is completely configurable i.e. one token per hour or 10 tokens per day etc.

# What problem does it solve?

At present blockchain faucets are prone to being spammed; even in cases where the blockchain tokens are not worth much. This spamming overloads the faucet hosting and also dries up faucet supply. This makes it hard for legitimate smart contract developers etc. to obtain free tokens.

# How does it work?

This node application allows users to paste in their Ethereum compatible address (future version will accept a link to a social media post with address also). 

This application transfers the blockchain token from the faucet to the user's account.

Future versions of this application will optionally collect some information (as per social media's public APIs) about the user i.e. when their account was created, etc in order to determine if the users are legitimate or just bots. Like everything else this will also be configurable.

# What is configurable
A lot of parameters will be configurable. This is good for security (separate config file) and also allows this code to be reused for other projects. Configurations will eventially include:
- faucet_private_key
- faucet_public_key
- blockchain_rpc
- blockchain_chain_id
- hash_tags_to_check
- collect_api_data
- user_rate_limit
- rate_limit_duration
- token_amount_in_wei
- blockchain_logo_url
- blockchain_name
- blockchain_description
- blockchain_block_explorer_url
- blockchain_block_explorer_address_url
- blockchain_block_explorer_transaction_url

## How to host it (as a faucet for your own blockchain network)

### System dependencies

**Ubuntu example**

```
sudo apt update
sudo apt install nodejs npm
```

### Fetch the code

```
git clone https://github.com/ParaState/universal-blockchain-faucet.git
```

Change directories

```
cd universal-blockchain-faucet
```

### Configure 

Create a new file called `.env` and add the following text

```
# A throw away practice key (never store large amounts in this address for obvious reasons)
faucet_private_key=xx123xx
faucet_public_key=0x2C67EE088F309438B27DAC19D76B4Eb860232871
blockchain_rpc=https://rpc.parastate.io:8545
blockchain_chain_id=123
# How many times a user can use this server per duration period
user_rate_limit=10
# The duration period in minutes i.e. 1440 is 24 hours
rate_limit_duration=1
# The amount of wei to be sent per airdrop i.e. 1000000000000000000 (to send 1 ETH)
token_amount_in_wei=1000000000000000
blockchain_logo_url=https://pbs.twimg.com/profile_images/1357246244540751873/zhVBBG5-_400x400.jpg
blockchain_name=ParaState Testnet
blockchain_description=ParaState Testnet
blockchain_block_explorer_url=http://scan.parastate.io/
# URL and path to address/account, include trailing slash i.e. https://explore.io/address/
blockchain_block_explorer_address_url=http://scan.parastate.io/account/
# URL and path to transaction/tx etc, including trailing slash i.e. https://explore.io/tx/
blockchain_block_explorer_transaction_url=http://scan.parastate.io/tx/
# Override gas price
gas_price=5000000000
# Override gas limit
gas_limit=8000000
# Flavour of client's web3 i.e. oeth (Oasis Ethereum), cmt (CyberMiles), eth (Ethereum), state (ParaState), dot (Polkadot)
web3_flavour=eth
server_name=testnet.faucet.parastate.io
server_port=8001
# Are you using HTTPS (letsencrypt)? yes/no
https=no
host=0.0.0.0
data_dir=/media/nvme/universal-faucet-data
twitter_bearer_token=
```

### Data directory

Create a data directory which is the same as what you just set in the `.env` file

```
sudo mkdir -p /media/nvme/universal-faucet-data
sudo chown -R $USER:$USER /media/nvme/universal-faucet-data
```

### Create the data file

```
touch /media/nvme/universal-faucet-data/data.txt
```

### Install node dependencies automatically

```
npm install
```

### Start

```
npm run prod
```

## How to use it (as an end user)

### Web site

Users will visit the site and paste in their public key

![home page](https://github.com/ParaState/universal-blockchain-faucet/raw/main/home_page.png)

### HTTP Request Response

Users can also use requests to perform the same task. For example the following HTTP Post request can be used (where `0xF9A8917c7fFb04822daDC861E9e66E69cecCD248` is the users public key).

```
curl --location --request POST 'http://localhost:8001/api/0xF9A8917c7fFb04822daDC861E9e66E69cecCD248'
```

### Rate limiting

The faucet uses rate limiting which will return the [429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) response code; if rate is exceeded. For web users the following static page will be shown as the visual response (still technically a 429 response with a static page attached)

![rate limit image](https://github.com/ParaState/universal-blockchain-faucet/raw/main/rate_limit_page.png)

## Development

If you would like to contribute to this project and you don't want your `.env` file to be pushed to this repo, please run the following commands. 

```
git rm .env --cached
git commit -m "Stopped tracking .env File"
```

## Hosting using SSL

If you would like to host this as a stand alone faucet for your own project it is advised that you use letsencrypt and provide users with https address (as apposed to just hosting locally via http for testing and dev purposes).

First install these packages on Ubuntu operating system.

```
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y certbot
```

Create a new directory for the letsencrypt certificates

```
sudo mkdir /etc/letsencrypt
sudo chown $USER:$USER -R /etc/letsencrypt
```

Part of the verification of letsencrypt requires that you host a text file at a specific location on the server. The quickest way to do this is to install apache2 and use /var/www/html path on the server.

First install apache2

```
sudo apt install apache2
```

Then log into your server with another session (so you can perform the validation whilst also writing to www/html dir) 

Once you have two sessions open, run the following command to create and verify the certificates. It is just a matter of following the prompts.

```
sudo certbot certonly --manual
```

Example of apache2 work required whilst the above `certbot` command is running include ...

```
Create a file containing just this data:

asdfasdf

And make it available on your web server at this URL:

http://testnet.faucet.parastate.io/.well-known/acme-challenge/asdf

```

You then write the data provided by the `certbot` command to the file path provided by the `certbot` command.

```
sudo mkdir -p .well-known/acme-challenge
vi asdf
```

For example, enter the text `asdfasdf` and save `asdf` file and press enter to continue in the `certbot` terminal.


You will also need to open port 80 so that `certbot` can see the data in that file.

When the verification is finished you will need to update the ownership of the new certificates in the letsencrypt location (because they were written by root not your user). Simply do the following (to prevent an error like this `Error: EACCES: permission denied, open '/etc/letsencrypt` when starting the faucet)

```
sudo chown $USER:$USER -R /etc/letsencrypt
```
