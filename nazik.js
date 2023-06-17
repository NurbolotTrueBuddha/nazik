import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
import * as fs from "fs/promises"

const token = "5939756119:AAFhvxKwG5Fbb3oIN7HW0R4Fztrew8QtyoE"
const bot = new TelegramBot(token, { polling: true });

const chatId = '842592067'

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


cron.schedule('12 2,18 * * *', async() => {
    sendMessage();
})


bot.on('message', (msg) => {
    console.log(msg);
})