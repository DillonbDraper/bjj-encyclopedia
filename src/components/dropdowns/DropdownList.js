import { useContext, useState, useEffect } from 'react'
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

  const [positionValue, setpositionValue] = useState(0)
  const [orientationValue, setOrientationValue] = useState(0)
  const [subpositionValue, setsubpositionValue] = useState(0)


  useEffect(() => getSubpositions().then(getOrientations).then(getPositions), [])

  
  //Resets orientationValue and subpositionValue to empty strings when position is altered
  useEffect(() => {
    setOrientationValue(0)
    setsubpositionValue(0)
  }, [positionValue])

  //Handles URL changes on button click depending on which options have been selected
  const handleSubmit = (posishState, orientState, subposishState) => {
    if (posishState && !orientState && !subposishState) {
      props.history.push(`/position/${posishState.id}`)
    } else if (posishState && orientState && !subposishState) {
      props.history.push(`/position/${posishState.id}/orientation/${orientState.id}`)
    } else if (posishState && !orientState && subposishState) {
      props.history.push(`/position/${posishState.id}/subposition/${subposishState.id}`)
    } else if (posishState && orientState && subposishState) {
      props.history.push(`/position/${posishState.id}/orientation/${orientState.id}/subposition/${subposishState.id}`)
    }
  }

  //Returns parent positiondropdown and 2 children: TechniqueList and the orientation and subposition dropdowns
  return (
    <div className="dropdowns">
      <Autocomplete
        id="positions"
        options={positions}
        getOptionLabel={(posish) => {
          if (!posish.name || posish === {}) {
            return ""
          } else {
            return posish.name
          }
        }
        }
        getOptionSelected={(posish) => posish.id === positionValue}
        style={{ width: 300 }}
        value={positionValue}
        onChange={(event, newValue) => {
          //Ensures that positionValue is never null, which causes breakage as other components listen to and depend on it.
          if (!newValue) {
            setpositionValue(0)
          } else {
            setpositionValue(newValue)
            
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
        disabled={positionValue === 0 ? true : false}
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