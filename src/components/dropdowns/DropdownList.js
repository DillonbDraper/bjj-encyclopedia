import react, {useContext, useState, useEffect, useRef} from 'react'
import { PositionContext } from './PositionProvider'
import { SubpositionContext } from './SubpositionProvider'
import { OrientationContext } from './OrientationProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { OrientandSubDropdown } from "./OrientandSubDropdown"
import { Button } from '@material-ui/core';

export const DropdownList = props => {

    const { positions, getPositions } = useContext(PositionContext)
    const { orientations, getOrientations } = useContext(OrientationContext)
    const { subpositions, getSubpositions } = useContext(SubpositionContext)

 

    useEffect(() => getSubpositions().then(getOrientations).then(getPositions), [])





    const [ positionValue, setpositionValue ] = useState(null)
    const [ orientationValue, setOrientationValue ] = useState("")
    const [ subpositionValue, setsubpositionValue ] = useState("")

    const handleSubmit = (posishState, orientState, subposishState) => {
      if (posishState && !orientState && !subposishState) {
        props.history.push(`/position=${posishState.id}`)
      } else if (posishState && orientState && !subposishState) {
        props.history.push(`/position=${posishState.id}/orientation=${orientState.id}`)
      } else if (posishState && !orientState && subposishState) {
        props.history.push(`/position=${posishState.id}/subposition=${subposishState.id}`)
      } else if (posishState && orientState && subposishState) {
        props.history.push(`/position=${posishState.id}/orientation=${orientState.id}/subposition=${subposishState.id}`)
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
                setOrientationValue("")
                setsubpositionValue("")
                setpositionValue(newValue)

                console.log(orientationValue)
                console.log(subpositionValue)
                }}
              renderInput={(params) => <TextField {...params} label="Position" variant="outlined" />}
            />
            <OrientandSubDropdown key={1} positionValue={positionValue}
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
        </div>

          );
        }