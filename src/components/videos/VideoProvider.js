import React, { useState } from "react"

export const VideoContext = React.createContext()

export const VideoProvider = (props) => {

  const [videos, setVideos] = useState([]) 

  const getVideos = () => {
    return fetch("http://localhost:8088/videos")
      .then(res => res.json())
      .then(setVideos)
  }

  const addVideo = video => {
    return fetch("http://localhost:8088/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(video)
    })
      .then(getVideos)
  }

  /*
      You return a context provider which has the
      `locations` state, the `addLocation` function,
      and the `getLocation` function as keys. This
      allows any child elements to access them.
  */
  return (
    <VideoContext.Provider value={
      {
      videos, addVideo, getVideos
      }
    }>
      {props.children}
    </VideoContext.Provider>
  )
}