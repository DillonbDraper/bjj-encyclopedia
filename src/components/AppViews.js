import React from "react"
import { Route } from "react-router-dom"
import { VideoProvider } from "./videos/VideoProvider"
import { VideoList } from "./videos/VideoList"
import { VideoDetail } from "./videos/VideoDetail"
import { Logo } from "./Logo"
import { NoteList } from "./notes/NoteList"
import { NoteProvider } from "./notes/NoteProvider"
import { TechniqueList } from "./techniques/TechniqueList"
import { TechniqueProvider } from "./techniques/TechniqueProvider"

export const AppViews = (props) => {
    return (
        <>
            <VideoProvider>
                <TechniqueProvider>
                    <Route exact path="/" render={
                        props =>

                            <>
                                <Logo />
                                <VideoList {...props} />
                                <TechniqueList />
                            </>
                    } />
                    <NoteProvider>
                        <Route path="/videos/:videoId(\d+)" render={
                            props =>
                                <>
                                    <VideoDetail {...props} />
                                    <NoteList {...props} />
                                    <TechniqueList />
                                </>
                        } />
                    </NoteProvider>
                </TechniqueProvider>
            </VideoProvider>
        </>
    )
}