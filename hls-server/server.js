const express = require('express');
const { v4: uuidv4 } = require('uuid');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Настройка CORS для localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

const STREAMS_DIR = path.join(__dirname, 'streams');
fs.mkdirSync(STREAMS_DIR, { recursive: true });

app.use('/streams', express.static(STREAMS_DIR));

// 🚀 Генерация HLS на лету
app.get('/hls', async (req, res) => {
  const { videoUrl, audioUrl } = req.query;

  if (!videoUrl || !audioUrl) {
    return res.status(400).send('❌ Нужны параметры videoUrl и audioUrl');
  }

  const sessionId = uuidv4();
  const outputDir = path.join(STREAMS_DIR, sessionId);
  fs.mkdirSync(outputDir);

  const playlistPath = path.join(outputDir, 'playlist.m3u8');

  console.log(`🎬 Старт генерации HLS для ${sessionId}`);

 ffmpeg()
  .input(videoUrl)
  .inputOptions('-re')
  .input(audioUrl) // webm
  .inputOptions('-re')
  .outputOptions([
    '-map 0:v:0',
    '-map 1:a:0',
    '-c:v copy',
    '-c:a aac',        // 🎯 перекодируем Opus → AAC
    '-b:a 128k',
    '-shortest',
    '-f hls',
    '-hls_time 4',
    '-hls_list_size 5',
    '-hls_flags delete_segments+append_list+omit_endlist'
  ])
  .output(path.join(outputDir, 'playlist.m3u8'))
  .run();

 

  res.json({
    streamUrl: `/streams/${sessionId}/playlist.m3u8`,
    fullUrl: `http://localhost:${PORT}/streams/${sessionId}/playlist.m3u8`
  });
});

app.listen(PORT, () => {
  console.log(`🌐 Сервер запущен: http://localhost:${PORT}`);
});
