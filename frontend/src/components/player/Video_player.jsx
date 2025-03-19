import styles from "./styles.module.css";
import like from "/advertisement-svgrepo-com.svg";
import dislike from "/dislike-svgrepo-com.svg";
import ReactPlayer from 'react-player/lazy'


const VIDEO_URL = "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1742429042/ei/EgfbZ76NC7OH0u8P8ry5yQQ/ip/85.192.24.173/id/933db7c71ba4639b/itag/616/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/wft/1/sgovp/clen%3D765967138%3Bdur%3D13320.280%3Bgir%3Dyes%3Bitag%3D356%3Blmt%3D1731509261392209/rqh/1/hls_chunk_host/rr5---sn-4g5e6nzl.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/met/1742407442,/mh/Sl/mm/31,29/mn/sn-4g5e6nzl,sn-4g5edndz/ms/au,rdu/mv/m/mvi/5/pl/24/rms/au,au/force_finished/1/initcwndbps/967500/bui/AccgBcO1eQonPsjSUCGmjkgKQOAajzZEYeVKVfRifT9d41xS-kOpoHSz7uXio1RiS0IuQoRBkQqFvYay/spc/_S3wKvMTHvNIZ4oMrQ--S5J8EHsIVZIQQfkIqByar_9aLzi3QFvM3wdshKtjGl8rhSE/vprv/1/playlist_type/DVR/dover/13/txp/5532434/mt/1742406854/fvip/5/short_key/1/keepalive/yes/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,wft,sgovp,rqh,xpc,force_finished,bui,spc,vprv,playlist_type/sig/AJfQdSswRgIhAMCtMx4Rc3NJjUwTjvq4NpPEBac6aIZlJQedPtNXDbo8AiEArJyDSd4yWfrEhu8XupB7ZulDQTyqfgGUda9otR800NQ%3D/lsparams/hls_chunk_host,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/AFVRHeAwRgIhAPG52rsghveqcuBTeRMm8FE0pbdjMNagSuoy_qGPnu4CAiEA08W5yLh3KM9ER9ZUXjer3RtJI8WoNla-84UXHcRWE6o%3D/playlist/index.m3u8"
export function VideoPlayer() {
  return (
    <>
      <div className={styles.videoContainer}>
        <ReactPlayer id="videoPlayer" className={styles.plyr}
          url={VIDEO_URL} width="1280px" height="720px" controls={true} />

        <p className={styles.videoTitle}>
          😱Как Строиться ЧАЧА БРИДЖЕМ | Туториал😱CHA CHA BRIDGE 🔥 0 CPS
          СТРОИТЕЛЬСТВО!🔥
        </p>
        <div className={styles.channelInfo}>
          <img className={styles.channelImg} src="avatar.jpg" alt="avatar" />
          <div className={styles.channelNameContainer}>
            <p className={styles.channelName}>RoskomTube</p>
            <p className={styles.channelSubscribers}>500k subscribers</p>
          </div>
          <button className={styles.subscribeBtn}>Подписаться</button>
          <div className={styles.likeDislikeContainer}>
            <div className={styles.likesContainer}>
              <button className={styles.likeBtn}>
                <img
                  src={like}
                  alt="like"
                  className={styles.likeImg}
                />
              </button>
              <p className={styles.likesCount}>1231</p>
            </div>
            <button className={styles.dislikeBtn}>
              <img
                src={dislike}
                alt="dislike"
                className={styles.dislikeImg}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
