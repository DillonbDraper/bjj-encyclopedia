import {useState} from 'react'

export const YoutubeContext = React.createContext()

export const YoutubeProvider = props => {

    const [ytVideo, setYTVideo] = useState({})

const getVideoData = (videoKey) => {
    return fetch(`${baseURL}=${videoKey}&key=${key}&part=snippet`)
      .then(res => res.json())
      .then(setYTVideo)
  }

  return (
    <YoutubeContext.Provider value={
      {
      ytVideo, setYTVideo, getVideoData
      }
    }>
      {props.children}
    </YoutubeContext.Provider>
  )
}