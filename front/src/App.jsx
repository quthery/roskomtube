import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        setData(json),
        setLoading(false)
    })
  }, [])

  return (
    <>
      {loading
        ? 'roskomtube`'
        : <div>Ответ: {JSON.stringify(data)}</div>
      }
      <ReactPlayer src="http://localhost:5010/cors?url=https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1754427022/ei/LhqSaOylBdnFmLAP0oCAQQ/ip/85.192.24.173/id/6c06393609f9a046/itag/625/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/wft/1/sgovp/clen%3D1407689050%3Bdur%3D1327.993%3Bgir%3Dyes%3Bitag%3D313%3Blmt%3D1754106598779293/rqh/1/hls_chunk_host/rr2---sn-4g5e6ns7.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/met/1754405422,/mh/_A/mm/31,29/mn/sn-4g5e6ns7,sn-4g5ednsd/ms/au,rdu/mv/m/mvi/2/pl/24/rms/au,au/initcwndbps/1542500/bui/AY1jyLPQ4zO-GXdSAc7ZmtvVdVC1h1SweJwQlrarxKm_SLwp9BxYQOTuGKmVJbkNV88Qn5B-gEtNlrQy/spc/l3OVKVYcVbjnUZ7so6IDqU6Me_Sboi8h9RzRLbhUss3YMUXQwiOL2wvnglXvspOt/vprv/1/playlist_type/DVR/dover/13/txp/4432534/mt/1754405152/fvip/2/short_key/1/keepalive/yes/fexp/51548755/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,wft,sgovp,rqh,xpc,bui,spc,vprv,playlist_type/sig/AJfQdSswRAIgMczPLRbr-SK7F-Cg2V_AANU2wnl8pN0IH4mDio0jvhwCIHTOv1GbO1cMgI7VwARp7VT1fuaOz7z4gQR7fUEdRdBG/lsparams/hls_chunk_host,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRQIgVHwC_xXQ3l5d98fgpwk8PsxiXNIMdsFtIi6hgsFC6NQCIQDMg40w_62NOHWtSecn9HcpjV4bgwcadWV1EMSsWVmMvQ%3D%3D/playlist/index.m3u8" playing controls />
    </>
  )
}

export default App
