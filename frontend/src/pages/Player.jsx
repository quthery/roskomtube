import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export default function Player() {
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('id')
    
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!videoId) {
                setError('ID видео не указан')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`api/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1xh_sGXsIpE`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const result = await response.json()
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [videoId])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <div>
            <h1>Player</h1>
            {data && (
                <div>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}