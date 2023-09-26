import TelegramBot from 'node-telegram-bot-api';

const token = '5808842798:AAETfho7rtAFHJ63HuukTL1Ky8AodW260eQ'; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
    }
});