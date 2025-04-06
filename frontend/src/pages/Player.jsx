import CustomVideoPlayer from '@/widgets/CustomVideoPlayer'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Player() {
  const { id } = useParams()
  const [videoUrl, setVideoUrl] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)

  useEffect(() => {
    const yt_url = `https://www.youtube.com/watch?v=${id}`

    axios.post('http://localhost:8000/', null, {params: { url: yt_url }})
      .then((response) => {
        setVideoUrl(response.data.res_1080)
        setAudioUrl(response.data.audio)
      })
      .catch((error) => {
        console.error('Ошибка при получении видео:', error)
      })
  }, [id])

  if (!videoUrl || !audioUrl) {
    return <div>Загрузка видео...</div>
  }

  return (
    <CustomVideoPlayer audio_url={audioUrl} video_url={videoUrl} />
  )
}
