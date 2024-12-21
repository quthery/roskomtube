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
        info = ydl.extract_info(url, download=False)
        resp = {
            "title": info["title"],
            "video_id": info["id"],
            "like_count": info["like_count"],
            "channel": info["channel"],
            "channel_subs": info["channel_follower_count"],
            "uploader_id": info["uploader_id"],
            "upload_date": info["upload_date"],
            "original_url": info["original_url"],
            "fulltitle": info["fulltitle"],
            "uploader_url": info["uploader_url"],
            "original_url": info["original_url"],
        }

        for format in info.get("formats", []):
            if format.get("height") in (1080, 720, 360) and format.get("vcodec") != "none" and format.get("url", "").startswith("https://manifest.googlevideo.com") == False:
                resp["res_"+ str(format["height"])] = format["url"]
            elif format.get("acodec") != "none" and format.get("vcodec") == "none" and format.get("url", "").startswith("https://manifest.googlevideo.com") == False:
                resp["audio"] = format["url"]
        return resp

if __name__ == "__main__":
    uvicorn.run(app, port=8000)
