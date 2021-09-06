require('dotenv').config();
const BigNumber = require('bignumber.js')

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.telegram_bot_token;
const bot = new TelegramBot(token, {
  polling: true
});
console.log("Config set");

// Check to see if user is member of Telegram groups first
var temp = new BigNumber(1186346396);
console.log(temp.toNumber());
bot.getChatMember(-570968317, temp.toNumber() , (res) => {
    console.log(res);
});
