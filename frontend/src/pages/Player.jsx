import styles from './Player.module.css'
import HLSPlayer from '@/widgets/HLSPlayer'
export default function Player() {

    return (
        <div className={styles.playerContainer}>
            <HLSPlayer streamUrl="http://localhost:3000/streams/368884d5-5d34-49ad-9696-54b3dae352ca/playlist.m3u8"/>
        </div>
    )
}