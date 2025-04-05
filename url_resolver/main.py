from fastapi import FastAPI
from yt_dlp import YoutubeDL
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from fastapi import FastAPI, Response
import httpx
from starlette.responses import StreamingResponse
app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
@app.get("/api/proxy/video")
async def proxy_video(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url, follow_redirects=True)
        return StreamingResponse(
            response.aiter_bytes(),
            media_type="video/mp4",
            headers={
                "Accept-Ranges": "bytes",
                "Content-Length": response.headers.get("Content-Length", ""),
            }
        )

@app.get("/api/proxy/audio")
async def proxy_audio(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url, follow_redirects=True)
        return StreamingResponse(
            response.aiter_bytes(),
            media_type="audio/webm",
            headers={
                "Accept-Ranges": "bytes",
                "Content-Length": response.headers.get("Content-Length", ""),
            }
        )

if __name__ == "__main__":
    uvicorn.run(app, port=8000)
