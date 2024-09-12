const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Ваш токен бота
const TELEGRAM_BOT_TOKEN = '7052066840:AAEnTj0s7JlVqgdFvWVOIcBcrmeX44sxlY4';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/`;

// Функция отправки сообщения в Telegram
const sendMessageToTelegram = async (chatId, text) => {
  try {
    await axios.post(`${TELEGRAM_API_URL}sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  } catch (error) {
    console.error('Ошибка отправки сообщения в Telegram:', error.message);
  }
};

// Маршрут для получения новостей с Telegram
app.get('/news', async (req, res) => {
  try {
    const response = await axios.get(`${TELEGRAM_API_URL}getUpdates`);
    const messages = response.data.result.map(update => ({
      title: `Сообщение от ${update.message.from.first_name}`,
      description: update.message.text,
      date: new Date(update.message.date * 1000).toLocaleString(),
    }));
    res.json(messages);
  } catch (error) {
    console.error('Ошибка получения новостей:', error.message);
    res.status(500).send('Ошибка при получении данных');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
