import React from 'react'
import { Link } from "react-router-dom"

export const Technique = props => (
    <li className="technique__link">
        <Link to={{
            pathname: `/techniques/${props.id}`
        }}>{props.name}</Link>
    </li>
)