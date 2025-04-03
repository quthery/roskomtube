import styles from '@/app/styles/sideBar.module.scss';
import home from '/home-icon.svg';
import shorts from '/shorts-icon.svg';
import playlists from '/playlists.svg';
import history from '/history-icon.svg';
import watchLater from '/tv-icon.svg';
import liked from '/like-icon-finger.svg';
import avatar from '/avatar.jpg';
export function SideBar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.section}>
                <div className={styles.item}>
                    <img class={styles.item__svg} src={home} alt="home" />
                    <span>Главная</span>
                </div>
                <div className={styles.item}>
                    <img class={styles.item__svg} src={shorts} alt="shorts" />
                    <span>Shorts</span>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.item}>
                    <img class={styles.item__svg} src={playlists} alt="playlists" />
                    <span>Плейлисты</span>
                </div>
                <div className={styles.item}>
                    <img class={styles.item__svg} src={history} alt="history" />
                    <span>История</span>
                </div>
                <div className={styles.item}>
                    <img class={styles.item__svg} src={watchLater} alt="watchLater" />
                    <span>Смотреть позже</span>
                </div>
                <div className={styles.item}>
                    <img class={styles.item__svg} src={liked} alt="liked" />
                    <span>Понравившиеся</span>
                </div>
            </div>
            <div className={styles.section}>
                <span className={styles.section__title}>Подписки</span>
                <div className={styles.item}>
                    <img class={styles.item__avatar} src={avatar} alt="liked" />
                    <span>quthery</span>
                </div>
                <div className={styles.item}>
                    <img class={styles.item__avatar} src={avatar} alt="liked" />
                    <span>quthery</span>
                </div>
                <div className={styles.item}>
                    <img class={styles.item__avatar} src={avatar} alt="liked" />
                    <span>quthery</span>
                </div>
            </div>
        </div>
    );
}