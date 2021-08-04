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

Configure the application by editing the `.env` file

### Install

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
