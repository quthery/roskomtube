import { Header } from './components/header/header.jsx'
import { Sidebar } from './components/sidebar/sidebar.jsx'
import { VideoCard } from './components/videoCard/videoCard.jsx'
import style from './App.module.scss'

const videos = [
  { id: 1, title: 'Видео 1' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 2, title: 'Видео 2' },
  { id: 3, title: 'Видео 3' }
];

export function App() {
  return <>
    <Header />
    <Sidebar />
    <div className={style.content}>
      {videos.map((video) => (
        <VideoCard key={video.id} title={video.title} />
      ))}
    </div>

  </>
}

