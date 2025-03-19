import style from './styles.module.css'
import { NavLink } from 'react-router'
import preview from '/preview.jpeg'

export function VideoCard({ title }) {
  return (
      <NavLink className={style.VideoItem} to="/player" end>
        <div className={style.videoItem}>
          <img src={preview} alt="asd" />
          <p className={style.text}>{title}</p>
        </div>
      </NavLink>
  )
}
