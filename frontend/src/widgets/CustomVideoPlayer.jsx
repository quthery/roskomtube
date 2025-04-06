import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import styles from "@/app/styles/Player.module.scss";

export default function VideoPlayer({ video_url, audio_url }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(100); // Состояние громкости
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    const player = new Plyr(video, {
      controls: ["play", "progress", "current-time"],
    });

    video.muted = true;
    video.volume = 0;

    let videoReady = false;
    let audioReady = false;

    const tryPlayAudio = () => {
      if (videoReady && audioReady && audio.paused && !video.paused) {
        audio.currentTime = video.currentTime;
        audio.play().catch((err) => {
          console.warn("Не удалось воспроизвести аудио:", err);
        });
      }
    };

    video.addEventListener("canplay", () => {
      videoReady = true;
      tryPlayAudio();
    });

    audio.addEventListener("canplay", () => {
      audioReady = true;
      tryPlayAudio();
    });

    player.on("play", () => tryPlayAudio());
    player.on("pause", () => audio.pause());
    player.on("seeked", () => {
      audio.currentTime = video.currentTime;
      tryPlayAudio();
    });

    const handleTimeUpdate = () => {
      const buffered = video.buffered;
      const currentTime = video.currentTime;

      let isBuffered = false;
      for (let i = 0; i < buffered.length; i++) {
        if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
          isBuffered = true;
          break;
        }
      }

      if (!isBuffered) {
        if (!audio.paused) {
          audio.pause();
          console.log("⏸ Аудио остановлено — видео не прогружено");
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    const handleKeydown = (event) => {
      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        video.paused ? video.play() : video.pause();
      }
      if (event.key === "f" || event.key === "а") {
        toggleFullscreen();
      }
      if (event.key === "ArrowLeft") {
        video.currentTime = Math.max(0, video.currentTime - 5);
      }
      if (event.key === "ArrowRight") {
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      player.destroy();
    };
  }, [video_url, audio_url]);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume / 100;
    audioRef.current.volume = newVolume / 100;
  };

  const toggleFullscreen = () => {
    const container = document.querySelector(".plyr");
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => console.warn(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.warn(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div className={styles.container}>
      <video ref={videoRef} className="plyr">
        <source src={video_url} type="video/mp4" />
      </video>
      <audio ref={audioRef}>
        <source src={audio_url} type="audio/mp3" />
      </audio>

      <div className={styles.controls}>
        <div className={styles.timelineContainer}>
          <div className={styles.volumeControl}>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
            />
            <span>{volume}%</span>
          </div>

          <div className={styles.playbackControls}>
            <button
              onClick={toggleFullscreen}
              className={styles.fullscreenButton}
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
