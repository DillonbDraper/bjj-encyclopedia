import react, {useContext, useState, useEffect} from 'react'
import { PositionContext } from './PositionProvider'
import { SubpositionContext } from './SubpositionProvider'
import { OrientationContext } from './OrientationProvider'


export const DropdownList = props => {
    const { positions, getPositions } = useContext(PositionContext)
    const { orientations, getOrientations } = useContext(OrientationContext)
    const { subpositions, getSubpositions } = useContext(SubpositionContext)

    useEffect(() => getSubpositions.then(getOrientations).then(getPositions), [])

}