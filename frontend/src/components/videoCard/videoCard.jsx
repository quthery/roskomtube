import style from './styles.module.css'
import preview from '/preview.jpeg'

export function VideoCard({ title }) {
  return <>
    <div className={style.videoItem}>
      <img src={preview} alt="asd" />
      <p>{title}</p>
    </div>
  </>
}
