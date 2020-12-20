import React from 'react'
import { Link } from "react-router-dom"
import "./TechniqueList.css"

export const Technique = props => (
    <li className="technique__link">
        <Link to={{
            pathname: `/techniques/${props.id}`
        }} style={{color: "white"}}>{props.name}</Link>
    </li>
)