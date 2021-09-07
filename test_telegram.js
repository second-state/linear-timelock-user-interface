require('dotenv').config();
const BigNumber = require('bignumber.js')

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.telegram_bot_token;
const bot = new TelegramBot(token, {
  polling: true
});
console.log("Config set");

bot.onText(/\/test (.+)/, (message, match) => {
// Check to see if user is member of Telegram groups first
bot.getChatMember("@ParaState", message.from.id).then(result => {
  console.log(result);
  console.log(result.status);
}, reason => {
  console.error(reason); // Error!
});
});
