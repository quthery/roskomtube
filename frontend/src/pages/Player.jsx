import CustomVideoPlayer from "@/widgets/CustomVideoPlayer";
import { Layout } from "@/app/Layout";
import LogoCycle from "@/shared/LogoCycle";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/app/styles/Player.page.module.scss";

export default function Player() {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const yt_url = `https://www.youtube.com/watch?v=${id}`;

    axios
      .post("http://localhost:8000/", null, { params: { url: yt_url } })
      .then((response) => {
        setVideoUrl(response.data.res_1080);
        setAudioUrl(response.data.audio); // FIXME: я специально это сделал что бы тестить загрузку страницы потом удалю
        setMetadata({
          title: response.data.title,
          videoId: response.data.video_id,
          likeCount: response.data.like_count,
          channel: response.data.channel,
          channelSubs: response.data.channel_subs,
          uploaderId: response.data.uploader_id,
          uploadDate: response.data.upload_date,
          originalUrl: response.data.original_url,
          fullTitle: response.data.fulltitle,
          uploaderUrl: response.data.uploader_url
        });
      })
      .catch((error) => {
        console.error("Ошибка при получении видео:", error);
      });
  }, [id]);

  if (!videoUrl || !audioUrl || !metadata) {
    return (
      <div>
        <LogoCycle />
      </div>
    );
  }

  return (
    <Layout sidebar={false}>
    <div className={styles.videoContainer}>
      <CustomVideoPlayer audio_url={audioUrl} video_url={videoUrl} />
      
      <h1 className={styles.videoTitle}>{metadata?.title}</h1>
      
      <div className={styles.channelInfo}>
        <div href={metadata?.uploaderUrl} target="_blank" rel="noopener noreferrer" className={styles.channelLink}>
          <a href=""><img className={styles.channelImg} src="/avatar.jpg" alt="avatar" /></a>
          <div className={styles.channelNameContainer}>
            <a href={metadata?.uploaderUrl} className={styles.channelName}>{metadata?.channel}</a> 
            <p className={styles.channelSubscribers}>{metadata?.channelSubs} подписчиков</p>
          </div>
        </div>
        <button className={styles.subscribeBtn}>Подписаться</button>
        
        <div className={styles.likeDislikeContainer}>
          <div className={styles.likesContainer}>
            <button className={styles.likeBtn}>
              <img src="/like-svgrepo-com.svg" alt="like" className={styles.likeImg} />
            </button>
            <p className={styles.likesCount}>{metadata?.likeCount}</p>
          </div>
          <button className={styles.dislikeBtn}>
            <img src="/dislike-svgrepo-com.svg" alt="dislike" className={styles.dislikeImg} />
          </button>
        </div>
        
        <div className={styles.shareContainer}>
          <img className={styles.shareImg} src="/share.svg" alt="share icon" />
          <p className={styles.shareText}>Поделиться</p>
        </div>
        
        <div className={styles.removeAdContainer}>
          <button className={styles.removeAdBtn}>
            <img className={styles.adImg} src="/advertisement-svgrepo-com.svg" alt="ad-logo" />
            Добавить таймкод на рекламу
          </button>
        </div>
      </div>

      <div className={styles.videoDescription}>
        <div className={styles.videoInfoDesc}>
          <p className={styles.postedAgo}>
            Опубликовано: {metadata?.uploadDate}
          </p>
        </div>
        <p className={styles.videoDescriptionText}>{metadata?.fullTitle}</p>
        <a 
          href={metadata?.originalUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.originalLink}
        >
          Оригинальное видео
        </a>
      </div>

      <div className={styles.commentsContainer}>
        <div className={styles.commentsInfo}>
          <p className={styles.commentsCount}>9 комментариев</p>
          <button className={styles.sortCommentsBtn}>Упорядочить</button>
        </div>
        <div className={styles.commentsInputContainer}>
          <input
            className={styles.commentsInput}
            type="text"
            placeholder="Введите комментарий"
          />
        </div>
      </div>
    </div>
    </Layout>
  );
}
