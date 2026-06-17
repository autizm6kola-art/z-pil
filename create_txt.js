// generate-audio-list.js
const fs = require('fs');

// Контролируемое число строк
const totalLines = 1000;

let content = '';

for (let i = 1; i <= totalLines; i++) {
  // Формируем номер с ведущими нулями (минимум 3 цифры): 001, 002, …
  const paddedIndex = String(i).padStart(3, '0');
  content += `${i} | /audio/z_${paddedIndex}.mp3 |\n`;
}

// Записываем в файл
fs.writeFile('audio_list.txt', content, (err) => {
  if (err) {
    console.error('Ошибка при записи файла:', err);
    return;
  }
  console.log(`Файл audio_list.txt успешно создан с ${totalLines} строками.`);
});
