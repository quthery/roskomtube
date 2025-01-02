import styles from './App.module.scss'
import { Details } from "./Details"
import { useEffect, useState } from 'react'


export function App(){
  const [details, setDetails] = useState({
    title: 'Hello, Vite!',
    subtitle: 'Welcome to Vite!',
    buttonText: 'Click me!'
  })

  useEffect(() => {
    console.log('Details updated:', details)
    setDetails(prev => ({
      ...prev, subtitle: 'title changed!',
    }))
    }, [details.title])

  return (
  <div className={styles.layout}>

  <Details details={details} setDetails={setDetails} />

  </div>
  )
}  

