import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function VideoPlayer({video_url, audio_url}) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (videoRef.current) {
      const plyrInstance = new Plyr(videoRef.current, {
        controls: ["play", "progress", "current-time"]
      });

      setPlayer(plyrInstance);

      const video = videoRef.current;
      const audio = audioRef.current;
      video.muted = false;
      video.volume = 0;

      plyrInstance.on("play", () => audio.play());
      plyrInstance.on("pause", () => audio.pause());
      plyrInstance.on("seeked", () => {
        audio.currentTime = video.currentTime;
      });

      return () => {
        plyrInstance.destroy();
      };
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    const newMuted = !audio.muted;
    audio.muted = newMuted;
    setMuted(newMuted);
    if (!newMuted) {
      audio.volume = volume;
    }
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (!muted) {
      audioRef.current.volume = value;
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.closest(".plyr");
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      const video = videoRef.current;
      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        video.paused ? video.play() : video.pause();
      } else if (event.key === "f" || event.key === "а") {
        toggleFullscreen();
      } else if (event.key === "ArrowLeft") {
        video.currentTime = Math.max(0, video.currentTime - 5);
      } else if (event.key === "ArrowRight") {
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} className="plyr">
        <source src={video_url} type="video/mp4" />
      </video>

      <div className="plyr__controls">
        <div className="custom-volume">
          <button onClick={toggleMute}>{muted ? "🔇" : "🔊"}</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className={muted ? "muted" : ""}
          />
        </div>
        <button onClick={toggleFullscreen} className="custom-fullscreen-btn">
          ⛶
        </button>
      </div>

      <audio ref={audioRef}>
        <source src={audio_url} type="audio/mp3" />
      </audio>
    </div>
  );
}
