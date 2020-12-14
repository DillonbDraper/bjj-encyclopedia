import react, { useContext, useState, useEffect, useRef } from 'react'
import { PositionContext } from './PositionProvider'
import { SubpositionContext } from './SubpositionProvider'
import { OrientationContext } from './OrientationProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { OrientandSubDropdown } from "./OrientandSubDropdown"
import { Button } from '@material-ui/core';
import { TechniqueList } from '../techniques/TechniqueList'

export const DropdownList = props => {

  const { positions, getPositions } = useContext(PositionContext)
  const { orientations, getOrientations } = useContext(OrientationContext)
  const { subpositions, getSubpositions } = useContext(SubpositionContext)

  const [positionValue, setpositionValue] = useState({})
  const [orientationValue, setOrientationValue] = useState({})
  const [subpositionValue, setsubpositionValue] = useState({})


  useEffect(() => getSubpositions().then(getOrientations).then(getPositions), [])

  useEffect(() => {
    setOrientationValue("")
    setsubpositionValue("")
  }, [positionValue])





  const handleSubmit = (posishState, orientState, subposishState) => {
    console.log(orientState)

    if (posishState && (!orientState && orientState !== {}) && (!subposishState && subposishState !== {})) {
      props.history.push(`/position/${posishState.id}`)
    } else if (posishState && orientState && !subposishState) {
      props.history.push(`/position/${posishState.id}/orientation/${orientState.id}`)
    } else if (posishState && !orientState && subposishState) {
      props.history.push(`/position/${posishState.id}/subposition/${subposishState.id}`)
    } else if (posishState && orientState && subposishState) {
      console.log("hi")
      props.history.push(`/position/${posishState.id}/orientation/${orientState.id}/subposition/${subposishState.id}`)
    }
  }

  return (
    <div className="dropdowns">
      <Autocomplete
        id="positions"
        options={positions}
        getOptionLabel={(posish) => posish.name}
        style={{ width: 300 }}
        value={positionValue}
        onChange={(event, newValue) => {
          if (!newValue) {
            setpositionValue({})
            setOrientationValue("")
            setsubpositionValue("")
          } else {
            setpositionValue(newValue)
            setOrientationValue("")
            setsubpositionValue("")
          }
     
        }}
        renderInput={(params) => <TextField {...params} label="Position" variant="outlined" />}
      />
      <OrientandSubDropdown key={1} 
        positionValue={positionValue}
        orientationValue={orientationValue}
        setOrientationValue={setOrientationValue}
        subpositionValue={subpositionValue}
        setsubpositionValue={setsubpositionValue}
      />
      <Button onClick={evt => {
        evt.preventDefault()
        handleSubmit(positionValue, orientationValue, subpositionValue)
      }
      }
        variant="contained"
        color="primary"
        disabled={typeof positionValue === 'object' && positionValue !== null ? false : true}
      >Search</Button>

      <TechniqueList
        orientationValue={orientationValue}
        positionValue={positionValue}
        subpositionValue={subpositionValue}
      >

      </TechniqueList>
    </div>

  );
}