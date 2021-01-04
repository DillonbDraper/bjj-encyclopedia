import React from "react"
import logo from "../images/bjj-logo.png"
import "./logo.css"

export const Logo = () => (
    <div className="logoContainer">
    <img className="logo" src={logo} alt="Can't load logo" />
    </div>
)