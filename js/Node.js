// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Здесь ваш токен бота
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // ID чата или группы, куда бот отправляет данные

// Роут для получения новостей
app.get('/news', async (req, res) => {
    try {
        // Пример вызова API для получения данных
        const response = await axios.get(`https://api.telegram.org/bot7052066840:AAEnTj0s7JlVqgdFvWVOIcBcrmeX44sxlY4/getUpdates`);
        
        const messages = response.data.result.map(update => {
            return {
                title: `Сообщение от ${update.message.from.first_name}`,
                description: update.message.text,
                date: new Date(update.message.date * 1000)
            };
        });
        
        res.json(messages);
    } catch (error) {
        res.status(500).send('Ошибка при получении данных');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
