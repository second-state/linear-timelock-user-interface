# Faucet with social media authentication

# What does it do?

This software provides blockchain tokens to users who post on social media; all components are configurable.

# What problem does it solve?

At present blockchain faucets are prone to being spammed; even in cases where the blockchain tokens are not worth much. This spamming overloads and also dries up faucet supply, making it hard for legitimate smart contract developers etc. to obtain free tokens.

# How does it work?

This node application allows users to paste in a link to their social media post. 

The user is required to paste their public key inside their social media post. In some cases they may also be required to use a specific hashtag i.e. hashtag of a conference etc. 

This application then goes and reads that social media post, obtains the key and finally transfers the blockchain token from the faucet to the user's account.

This application optionally collects some information (as per social media's public APIs) about the user i.e. when their account was create, lists of followers in order to determine if the users are legitimate or just bots. This is configurable.

The application can rate limit the amount of tokens that it provides to users. This is configurable.

# What is configurable
A lot of parameters are configurable. This is good for security (separate config file) and also allows this code to be reused for other projects. Configurations include:
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

## How to use it

### Fetch the code

```
git clone https://github.com/second-state/faucet-with-social-media-authentication.git
```

### Configure 

Configure the application by editing `config.env`

### Run 

Change directories

```
cd faucet-with-social-media-authentication
```

### Install

```
npm init
```

### Start

```
npm run prod
```

