import './App.css'
import { useState } from 'react'
import { Layout } from '@/app/Layout'
import { VideoCard } from '@/widgets/VideoCard'

const videos = [
    {
        id: 1,
        title: 'Как создать React приложение с нуля',
        channelName: 'WebDev Channel',
        views: '1.2M',
        date: '2 дня назад'
    },
    {
        id: 2,
        title: '10 советов по JavaScript для начинающих',
        channelName: 'Code Masters',
        views: '856K',
        date: '1 неделя назад'
    },
    {
        id: 3,
        title: 'Полный курс по CSS Grid',
        channelName: 'Frontend Pro',
        views: '2.1M',
        date: '3 месяца назад'
    },
    {
        id: 4,
        title: 'TypeScript vs JavaScript: что выбрать?',
        channelName: 'Tech Talks',
        views: '543K',
        date: '5 дней назад'
    },
    {
        id: 5,
        title: 'Как оптимизировать React приложение',
        channelName: 'React Masters',
        views: '1.5M',
        date: '2 недели назад'
    },
    {
        id: 6,
        title: 'Создание REST API на Node.js',
        channelName: 'Backend Dev',
        views: '987K',
        date: '1 месяц назад'
    },
    {
        id: 7,
        title: 'Основы Git и GitHub',
        channelName: 'Dev Tools',
        views: '3.2M',
        date: '4 месяца назад'
    },
    {
        id: 8,
        title: 'Как стать Full Stack разработчиком',
        channelName: 'Career Guide',
        views: '1.8M',
        date: '3 недели назад'
    },
    {
        id: 9,
        title: 'Docker для начинающих',
        channelName: 'DevOps Channel',
        views: '765K',
        date: '6 дней назад'
    },
    {
        id: 10,
        title: 'Создание анимаций в CSS',
        channelName: 'CSS Masters',
        views: '1.1M',
        date: '2 месяца назад'
    }
]

function App() {
  return (
    <>
      <Layout>
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px',
            padding: '20px'
        }}>
            {videos.map(video => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
      </Layout>
    </>
  )
}

export default App
