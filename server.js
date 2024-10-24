const WebSocket = require('ws');

// Создание WebSocket-сервера на порту 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket сервер запущен на порту 8080');

// Событие при подключении нового клиента
wss.on('connection', (ws) => {
  console.log('Новый клиент подключился');
  
  // Отправляем приветственное сообщение новому клиенту
  ws.send('Добро пожаловать в чат!');

  // Событие при получении сообщения от клиента
  ws.on('message', (message) => {
    console.log(`Получено сообщение: ${message}`);
    
    // Пересылка сообщения всем подключенным клиентам
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Событие при отключении клиента
  ws.on('close', () => {
    console.log('Клиент отключился');
  });
});
