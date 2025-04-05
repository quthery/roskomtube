
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import styles from '@/app/styles/Player.module.scss'

export default function Player() {
    const videoRef = useRef(null)
    const hlsRef = useRef(null)

    // URL вашего .m3u8 файла
    const manifestUrl = 'http://localhost:3000/hls/playlist.m3u8'

    useEffect(() => {
        const initHls = () => {
            if (hlsRef.current) {
                hlsRef.current.destroy()
            }

            if (Hls.isSupported()) {
                const hls = new Hls({
                    debug: false,
                    enableWorker: true,
                    lowLatencyMode: true
                })

                hlsRef.current = hls
                hls.attachMedia(videoRef.current)

                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    console.log('HLS подключен к видео элементу')
                    hls.loadSource(manifestUrl)
                })

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log('Манифест загружен, доступные качества:', hls.levels)
                })

                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.error('Фатальная ошибка сети', data)
                                hls.startLoad()
                                break
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.error('Фатальная ошибка медиа', data)
                                hls.recoverMediaError()
                                break
                            default:
                                console.error('Фатальная ошибка HLS', data)
                                break
                        }
                    }
                })
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                // Нативная поддержка HLS (Safari)
                videoRef.current.src = manifestUrl
            } else {
                console.error('HLS не поддерживается в вашем браузере')
            }
        }

        if (videoRef.current) {
            initHls()
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy()
            }
        }
    }, [])

    return (
        <div className={styles.playerContainer}>
            <video
                ref={videoRef}
                className={styles.videoPlayer}
                controls
            />
        </div>
    )
}