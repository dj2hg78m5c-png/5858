import https from 'https';
import fs from 'fs';

const urls = [
  'https://cdn.pixabay.com/audio/2024/11/04/audio_4956b4efd3.mp3',
  'https://cdn.pixabay.com/audio/2023/11/06/audio_0c3a39e0fe.mp3', 
  'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab478.mp3',
];

function tryDownload(index) {
  if (index >= urls.length) {
    console.log('All attempts failed');
    return;
  }
  const url = urls[index];
  console.log(`Trying ${index + 1}/${urls.length}: ${url}`);
  const file = fs.createWriteStream('C:/wodett/public/bgm.mp3');
  https.get(url, (res) => {
    if (res.statusCode === 403 || res.statusCode === 404) {
      console.log(`Failed with status ${res.statusCode}, trying next...`);
      fs.unlinkSync('C:/wodett/public/bgm.mp3');
      tryDownload(index + 1);
      return;
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      const size = fs.statSync('C:/wodett/public/bgm.mp3').size;
      console.log(`Downloaded! Size: ${size} bytes`);
    });
  }).on('error', (e) => {
    console.log(`Error: ${e.message}, trying next...`);
    try { fs.unlinkSync('C:/wodett/public/bgm.mp3'); } catch {}
    tryDownload(index + 1);
  });
}

tryDownload(0);
