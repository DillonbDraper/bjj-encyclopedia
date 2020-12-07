import React from "react"
import { Route } from "react-router-dom"
import { VideoProvider } from "./videos/VideoProvider"
import { VideoList } from "./videos/VideoList"

export const AppViews = (props) => {
    return (
        <>
            <VideoProvider>
            <Route exact path="/">
                            <VideoList />
                        </Route>
            </VideoProvider>
        </>
    )
    }