import React from "react"
import { Route } from "react-router-dom"
import { VideoProvider } from "./videos/VideoProvider"
import { VideoList } from "./videos/VideoList"
import { VideoDetail } from "./videos/VideoDetail"

export const AppViews = (props) => {
    return (
        <>
            <VideoProvider>
                <Route exact path="/" render={
                    props => <VideoList {...props} />
                } />
                <Route path="/videos/:videoId(\d+)" render={
                    props => <VideoDetail {...props}/>
                } />
            </VideoProvider>
        </>
    )
}