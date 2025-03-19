import { VideoCard } from './components/videoCard/VideoCard.jsx'
import style from './App.module.scss'
import { Layout } from './layouts/Layout.jsx';

const videos = [
  { id: 1, title: 'Видео 1' },
  { id: 2, title: 'Видео 2' },
  { id: 3, title: 'Видео 3' }
];

export function App() {
  return <>
    <Layout>
      <div className={style.content}>
        {videos.map((video) => (
          <VideoCard key={video.id} title={video.title} />
        ))}
      </div>
    </Layout>

  </>
}

