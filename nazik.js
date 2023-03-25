import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
import * as fs from "fs/promises"

const token = "5866660479:AAGPBTXoCazob-ZJbQu3D-zRb56igqXeXNM"
const bot = new TelegramBot(token, { polling: true });

const chatId = '1441148540'

let counter = 1;

async function sendMessage() {
    let data = await fs.readFile('./compliments.json', { encoding: 'utf8' });
    let converted = await JSON.parse(data);
    const message = converted.compliments[counter];
    await bot.sendMessage(chatId, message)
    counter++;
    if (counter >= converted.compliments.length) {
        counter = 0;
    }
};


cron.schedule('20 2, 8 * * *', async() => {
    sendMessage();
})


bot.on('message', (msg) => {
    console.log(msg);
})