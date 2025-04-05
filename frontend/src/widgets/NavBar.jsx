import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export function VideoPlayer({ manifestUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!manifestUrl) return;

    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(manifestUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error) => {
          console.log("Автовоспроизведение заблокировано:", error);
        });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Нативная поддержка HLS для Safari
      video.src = manifestUrl;
    }
  }, [manifestUrl]);

  return (
    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
      <video
        ref={videoRef}
        controls
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '720px',
          backgroundColor: '#000',
        }}
      />
    </div>
  );
} 