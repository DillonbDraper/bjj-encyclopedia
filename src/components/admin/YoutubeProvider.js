import React from 'react'
import {useState} from 'react'
import { key } from '../../Youtubekey.js'

export const YoutubeContext = React.createContext()

export const YoutubeProvider = props => {

    const baseURL = "https://www.googleapis.com/youtube/v3/videos?id"

    const [ytVideo, setYTVideo] = useState({})

const getVideoData = (videoKey) => {
    return fetch(`${baseURL}=${videoKey}&key=${key}&part=snippet`)
      .then(res => res.json())
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