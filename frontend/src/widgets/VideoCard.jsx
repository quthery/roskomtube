import styles from '@/app/styles/videoCard.module.scss'
import thumbnail from '/preview.jpeg'
import channelIcon from '/avatar.jpg'
import { Link } from 'react-router'

export function VideoCard({ video }) {
    return (
        <Link to={`/player?id=${video.id}`}>
            <div className={styles.videoCard}>
                <img src={thumbnail} alt={video.title} />
                <div className={styles.videoInfo}>
                    <img src={channelIcon} alt={video.channelName} className={styles.channelIcon} />
                    <div className={styles.videoDetails}>
                        <h3>{video.title}</h3>
                        <div className={styles.channelName}>{video.channelName}</div>
                        <div className={styles.videoStats}>
                            <span>{video.views} просмотров</span>
                            <span>{video.date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
