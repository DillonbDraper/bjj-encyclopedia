import React, { useContext, useEffect } from "react"
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
    const isAdmin = localStorage.getItem("admin")
    return (

        <>
            <VideoProvider>
                <TechniqueProvider>
                    <PositionProvider>
                        <OrientationProvider>
                            <SubpositionProvider>
                                <Route exact path="/" render={
                                    props =>
                                        <main className="container">
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </main>
                                } />

                                <Route exact path="/position/:positionId(\d+)" render={
                                    props =>
                                        <main className="container">
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </main>
                                } />

                                <Route exact path="/position/:positionId(\d+)/orientation/:orientationId(\d+)" render={
                                    props =>
                                        <main className="container">
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </main>
                                } />

                                <Route exact path="/position/:positionId(\d+)/subposition/:subpositionId(\d+)" render={
                                    props =>
                                        <main className="container">
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </main>
                                } />

                                <Route exact path="/position/:positionId(\d+)/orientation/:orientationId(\d+)/subposition/:subpositionId(\d+)" render={
                                    props =>
                                        <main className="container">
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </main>
                                } />

                                <Route exact path="/techniques/:techniqueId(\d+)" render={
                                    props =>
                                        <main className="container">
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </main>
                                } />

                                <Route exact path="/techName/:techniqueName" render={
                                    props =>
                                        <main className="container">
                                            <Logo className="logo" />
                                            <div className="main">
                                                <VideoList {...props} />
                                                <DropdownList {...props} />
                                            </div>
                                        </main>
                                } />
                                <YoutubeProvider>
                                    <Route exact path="/admin" render={
                                        props =>
                                            <main className="container"> {isAdmin === "true" ?
                                                <div className="adminPage">
                                                    <AdminForm {...props}></AdminForm>
                                                </div> : window.alert("You are not an administrator and do not have permission to access this page")}
                                            </main>
                                    } />
                                </YoutubeProvider>
                                <NoteProvider>
                                    <Route exact path="/videos/:videoId(\d+)" render={
                                        props =>
                                            <main className="container">
                                                <div className="detail">
                                                    <VideoDetail {...props} />
                                                    <DropdownList {...props} />
                                                </div>
                                            </main>
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