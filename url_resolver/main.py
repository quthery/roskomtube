from fastapi import FastAPI
from yt_dlp import YoutubeDL
import uvicorn
import json


app = FastAPI()

ydl_opts = {
        'format': 'bestvideo[height<=1080]+bestaudio/best[height<=1080]',  # Получить лучший формат для аудио и видео
        'noplaylist': True,  # Игнорировать плейлисты  # Отключить вывод лишней информации  # Объединить аудио и видео в один файл (если требуется)
    }

@app.post("/")
async def yt_stream_url(url: str):
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    
if __name__ == "__main__":
    uvicorn.run(app, port=8000)