const fs = require('fs');
const path = require('path');

// Путь к файлам
const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.json');

// Чтение input.txt
fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении файла:', err);
    return;
  }

  const lines = data.split('\n').filter(line => line.trim() !== '');

  const result = lines.map(line => {
    const [idStr, audioPath, text] = line.split('|').map(part => part.trim());
    const id = parseInt(idStr, 10);

    return {
      id: id,
      audio: audioPath,  // ← Сохраняем оригинальное имя аудио
      text: text
    };
  });

  // Запись результата в JSON
  fs.writeFile(outputPath, JSON.stringify(result, null, 2), 'utf8', err => {
    if (err) {
      console.error('Ошибка при записи файла:', err);
    } else {
      console.log('✅ JSON успешно создан: output.json');
    }
  });
});
