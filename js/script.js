document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-container");

  // Функция для получения новостей с сервера
  async function loadNews() {
    try {
      const response = await fetch("/news"); // Должен совпадать с маршрутом на сервере
      const newsData = await response.json();
      
      newsContainer.innerHTML = ""; // Очищаем контейнер перед загрузкой

      newsData.forEach(newsItem => {
        const newsElement = document.createElement("div");
        newsElement.className = "news-item";
        newsElement.innerHTML = `
          <h3>${newsItem.title}</h3>
          <p>${newsItem.description}</p>
          <p>${new Date(newsItem.date).toLocaleDateString()}</p>
        `;
        newsContainer.appendChild(newsElement);
      });
    } catch (error) {
      console.error("Ошибка загрузки новостей:", error);
    }
  }

  loadNews(); // Загружаем новости при загрузке страницы
});

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Токен вашего Telegram бота
const TELEGRAM_BOT_TOKEN = '7052066840:AAE2TWKPjUR8BKfDoe6ss_BVzccvj8GRwBM';
const TELEGRAM_CHAT_ID = '@websnsbot'; // ID чата, откуда бот будет получать данные

// Роут для получения новостей
app.get('/news', async (req, res) => {
    try {
        // Получаем сообщения с использованием Telegram API
        const response = await axios.get(`https://api.telegram.org/bot7052066840:AAE2TWKPjUR8BKfDoe6ss_BVzccvj8GRwBM/getUpdates`);
        
        const messages = response.data.result.map(update => {
            return {
                title: `Сообщение от ${update.message.from.first_name}`,
                description: update.message.text,
                date: new Date(update.message.date * 1000) // Telegram возвращает время в UNIX формате
            };
        });
        
        res.json(messages); // Возвращаем JSON ответ с новостями
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).send('Ошибка при получении данных');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-container");

  // Функция для получения новостей с сервера
  async function loadNews() {
    try {
      const response = await fetch("/news");
      const newsData = await response.json();
      
      newsContainer.innerHTML = ""; // Очищаем контейнер перед загрузкой

      newsData.forEach(newsItem => {
        const newsElement = document.createElement("div");
        newsElement.className = "news-item";
        newsElement.innerHTML = `
          <h3>${newsItem.title}</h3>
          <p>${newsItem.description}</p>
          <p>${newsItem.date}</p>
        `;
        newsContainer.appendChild(newsElement);
      });
    } catch (error) {
      console.error("Ошибка загрузки новостей:", error);
    }
  }

  loadNews(); // Загружаем новости при загрузке страницы
});
