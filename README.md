# Universal Faucet (for Ethereum compatible blockchain networks)

# What does it do?

This software provides Ethereum compatible blockchain tokens; think of this as a "Faucet as a Service".
It provides a web page interface (where users can paste in a social media post URL).
It also provides an RPC endpoint (which can be called manually or programatically).
This software has specific rate limiting built in.
Just as with settings like `token_amount_in_wei`, `blockchain_rpc`, `blockchain_chain_id` and so forth, the aforementioned rate limiting (`user_rate_limit` & `rate_limit_duration`) is completely configurable i.e. one token per hour or 10 tokens per day etc.

# What problem does it solve?

At present blockchain faucets are prone to being spammed; even in cases where the blockchain tokens are not worth much. This spamming overloads the faucet hosting and also dries up faucet supply. This makes it hard for legitimate smart contract developers etc. to obtain free tokens.

# How does it work?

This node application allows users to paste in a Tweet URL

This application transfers the blockchain token from the faucet to the user's account.

# What is configurable
As many parameters as possible will be configurable. This is good for security (separate config file) and also allows this code to be reused for other projects. 

## How to host it (as a faucet for your own blockchain network)

### System dependencies

**Ubuntu example**

```bash
sudo apt update
sudo apt install nodejs npm
```

### Fetch the code

```bash
git clone https://github.com/ParaState/universal-blockchain-faucet.git
```

Change directories

```bash
cd universal-blockchain-faucet
```

### Configure 

Create a new file called `.env` and add the following text (fill out your specific config options)

```python
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
https=yes
host=0.0.0.0
data_dir=/media/nvme/universal-faucet-data
twitter_bearer_token=
# Twitter Id of the blockchain you can use a site like tweeterid com to convert a handle to an id
twitter_id=1320374428979527681
twitter_handle=@_parastate
twitter_url=https://twitter.com/_parastate
telegram_bot_token=
telegram_bot_name=
username_faucet_bot=
```

### Data directory

Create a data directory which is the same as what you just set in the `.env` file

```bash
sudo mkdir -p /media/nvme/universal-faucet-data
sudo chown -R $USER:$USER /media/nvme/universal-faucet-data
```

### Create the data file

```bash
touch /media/nvme/universal-faucet-data/data.txt
```

### Install node dependencies automatically

```bash
npm install
```

### Start

```bash
npm run prod
```

## How to use it (as an end user)

### Web site

Users will visit the site and paste in their Twitter URL

![home page](./home_page_v1_twitter.png)

### Rate limiting

The faucet uses rate limiting which will return the [429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) response code; if rate is exceeded. For web users the following static page will be shown as the visual response (still technically a 429 response with a static page attached)

![rate limit image](https://github.com/ParaState/universal-blockchain-faucet/raw/main/rate_limit_page.png)

## Development

If you would like to contribute to this project and you don't want your `.env` file to be pushed to this repo, please run the following commands. 

```bash
git rm .env --cached
git commit -m "Stopped tracking .env File"
```

## Hosting Node using SSL

If you would like to host this as a stand alone faucet for your own project it is advised that you use letsencrypt and provide users with https address (as apposed to just hosting locally via http for testing and dev purposes).

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

Example of apache2 work required whilst the above `certbot` command is running include ...

```
Create a file containing just this data:

asdfasdf

And make it available on your web server at this URL:

http://testnet.faucet.parastate.io/.well-known/acme-challenge/asdf

```

You then write the data provided by the `certbot` command to the file path provided by the `certbot` command.

```bash
sudo mkdir -p .well-known/acme-challenge
vi asdf
```

For example, enter the text `asdfasdf` and save `asdf` file and press enter to continue in the `certbot` terminal.


You will also need to open port 80 so that `certbot` can see the data in that file.

When the verification is finished you will need to update the ownership of the new certificates in the letsencrypt location (because they were written by root not your user). Simply do the following (to prevent an error like this `Error: EACCES: permission denied, open '/etc/letsencrypt` when starting the faucet)

```bash
sudo chown $USER:$USER -R /etc/letsencrypt
```

## Offering redirects

It is also advised that you provide a redirect message for users who just visit the site's base domain i.e. if a user goes to `testnet.faucet.parastate.io` instead of the actual endpoint of `https://testnet.faucet.parastate.io:8081/faucet` 

To do this, go ahead and configure apache2 as follows.

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

Create the following area

```bash
sudo mkdir -p /var/www/html/testnet.faucet.parastate.io/public_html
```

Then create the following file

```bash
sudo vi /var/www/html/testnet.faucet.parastate.io/public_html/index.html
```

Adding the following content to that index.html file (obviously change details to suite your project)

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <!--
    Modified from the Debian original for Ubuntu
    Last updated: 2016-11-16
    See: https://launchpad.net/bugs/1288690
  -->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Welcome</title>
  </head>
  <body>
          <p>ParaState Testnet Faucet: <a href="https://testnet.faucet.parastate.io:8001/faucet"> https://testnet.faucet.parastate.io:8001/faucet</a></p>
          <p>ParaState Website: <a href="https://www.parastate.io/"> https://www.parastate.io/</a></p>
          <p>ParaState GitHub: <a href="https://github.com/ParaState"> https://github.com/ParaState/</a></p>
  </body>
</html>

```
We then cop the default configuration

```bash
cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/testnet.faucet.parastate.io.conf
```

We then open that file

```bash
sudo vi /etc/apache2/sites-available/testnet.faucet.parastate.io.conf
```

Adding the following content (again please change details to suite your project)

```
ServerAdmin webmaster@testnet.faucet.parastate.io
ServerName testnet.faucet.parastate.io
ServerAlias www.testnet.faucet.parastate.io
DocumentRoot /var/www/html/testnet.faucet.parastate.io/public_html
```
We then activate this new site

```bash
sudo a2ensite testnet.faucet.parastate.io
```

We then reload apache2

```bash
sudo systemctl reload apache2
```

```bash
sudo apt-get install software-properties-common -y 
sudo snap install --classic certbot
```

```bash
sudo apt-get install certbot python3-certbot-apache -y
```

```bash
sudo certbot --apache
```

Then follow the options of `1` and/or `2` as I have done (hint: I selected `2` then `2`)

```bash
sudo certbot --apache
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator apache, Installer apache

Which names would you like to activate HTTPS for?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: testnet.faucet.parastate.io
2: www.testnet.faucet.parastate.io
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): 1
Cert not yet due for renewal

You have an existing certificate that has exactly the same domains or certificate name you requested and isn't close to expiry.
(ref: /etc/letsencrypt/renewal/testnet.faucet.parastate.io.conf)

What would you like to do?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: Attempt to reinstall this existing certificate
2: Renew & replace the cert (limit ~5 per 7 days)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Renewing an existing certificate
Created an SSL vhost at /etc/apache2/sites-available/testnet.faucet.parastate.io-le-ssl.conf
Deploying Certificate to VirtualHost /etc/apache2/sites-available/testnet.faucet.parastate.io-le-ssl.conf
Enabling available site: /etc/apache2/sites-available/testnet.faucet.parastate.io-le-ssl.conf

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Redirecting vhost in /etc/apache2/sites-enabled/testnet.faucet.parastate.io.conf to ssl vhost in /etc/apache2/sites-available/testnet.faucet.parastate.io-le-ssl.conf

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Your existing certificate has been successfully renewed, and the new certificate
has been installed.

The new certificate covers the following domains:
https://testnet.faucet.parastate.io

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=testnet.faucet.parastate.io
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/testnet.faucet.parastate.io/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/testnet.faucet.parastate.io/privkey.pem
   Your cert will expire on 2021-11-08. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le

```

**Please note:** Any time you install, reinstall, or update certificates you will need to run the following chown command; because these certificate files are written to the letsencrypt folder as non user

```bash
sudo chown -R $USER:$USER /etc/letsencrypt/
```

Now, any visitors to your site (regardless if they visit `http` or `https` on the base domain via port 80), will receive the contents of the `/var/www/html/testnet.faucet.parastate.io/public_html/index.html` file; we created eariler. This is awesome because you can give them a hyperlink to the actual faucet on port 8001 and in addition some details about your blockchain, community, social media and so forth.
