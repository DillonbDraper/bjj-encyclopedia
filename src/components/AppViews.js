import React from "react"
import { Route } from "react-router-dom"
import { VideoProvider } from "./videos/VideoProvider"
import { VideoList } from "./videos/VideoList"
import { VideoDetail } from "./videos/VideoDetail"
import { Logo } from "./Logo"
import { NoteList } from "./notes/NoteList"
import { NoteProvider } from "./notes/NoteProvider"
import { TechniqueProvider } from "./techniques/TechniqueProvider"
import { PositionProvider } from "./dropdowns/PositionProvider"
import { DropdownList } from "./dropdowns/DropdownList"
import { OrientationProvider } from "./dropdowns/OrientationProvider"
import { SubpositionProvider } from "./dropdowns/SubpositionProvider"
import { AdminForm } from "./admin/AdminForm"
import "./AppViews.css"
import { YoutubeProvider } from "./admin/YoutubeProvider"

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
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </>
                                } />

                                <Route exact path="/position/:positionId(\d+)" render={
                                    props =>
                                        <>
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </>
                                } />

                                <Route exact path="/position/:positionId(\d+)/orientation/:orientationId(\d+)" render={
                                    props =>
                                        <>
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </>
                                } />

                                <Route exact path="/position/:positionId(\d+)/subposition/:subpositionId(\d+)" render={
                                    props =>
                                        <>
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </>
                                } />

                                <Route exact path="/position/:positionId(\d+)/orientation/:orientationId(\d+)/subposition/:subpositionId(\d+)" render={
                                    props =>
                                        <>
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </>
                                } />

                                <Route exact path="/techniques/:techniqueId(\d+)" render={
                                    props =>
                                        <>
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </>
                                } />
                                <YoutubeProvider>
                                    <Route exact path="/admin" render={
                                        props =>
                                            <>
                                                <div className="adminPage">
                                                    <AdminForm {...props}></AdminForm>
                                                </div>
                                            </>
                                    } />
                                </YoutubeProvider>
                                <NoteProvider>
                                    <Route exact path="/videos/:videoId(\d+)" render={
                                        props =>
                                            <>
                                                <div className="detail">
                                                    <VideoDetail {...props} />
                                                    <DropdownList {...props} />
                                                </div>
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