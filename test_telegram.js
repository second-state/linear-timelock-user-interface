require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.telegram_bot_token;
const bot = new TelegramBot(token, {
  polling: true
});
console.log("Config set");

// Check to see if user is member of Telegram groups first
var user_id = parseInt("1186346396");
bot.getChatMember("@parastateofficial", user_id, (res) => {
    console.log(res);
});
