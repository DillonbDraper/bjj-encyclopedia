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
import { PositionProvider } from "./dropdowns/PositionProvider"
import { DropdownList } from "./dropdowns/DropdownList"
import { OrientationProvider } from "./dropdowns/OrientationProvider"
import { SubpositionProvider } from "./dropdowns/SubpositionProvider"

export const AppViews = (props) => {
    return (
        <>
            <VideoProvider>
                <TechniqueProvider>
                    <PositionProvider>
                        <OrientationProvider>
                            <SubpositionProvider>
                                <Route exact path="/" render={
                                    props =>

                                        <>
                                            <Logo />
                                            <VideoList {...props} />
                                            <TechniqueList />
                                            <DropdownList {...props} />
                                        </>
                                } />
                                <Route exact path="/position/:positionId(\d+)" render={
                                        props =>
                                            <>
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                                <TechniqueList />
                                            </>
                                    } />
                                <NoteProvider>
                                    <Route exact path="/videos/:videoId(\d+)" render={
                                        props =>
                                            <>
                                                <VideoDetail {...props} />
                                                <NoteList {...props} />
                                                <TechniqueList />
                                            </>
                                    } />
                                </NoteProvider>
                            </SubpositionProvider>
                        </OrientationProvider>
                    </PositionProvider>
                </TechniqueProvider>
            </VideoProvider>
        </>
    )
}