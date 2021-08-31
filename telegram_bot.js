require('dotenv').config();

console.log("Starting Telegram Bot");

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.telegram_bot_token;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/faucet (.+)/, (msg, match) => {
    // The user's id who sent the command
    const chatId = msg.chat.id

    // The message which they sent
    const resp = match[1]
    console.log("Command recieved: " + resp);

    // Optional message to send back to original user
    bot.sendMessage(chatId, "This is an autometic bot response ... testing 123")
})

bot.on('message', (msg) => {
    console.log("Generic recieved: " + JSON.stringify(msg));
})