import react, {useContext, useState, useEffect} from 'react'
import { PositionContext } from './PositionProvider'
import { SubpositionContext } from './SubpositionProvider'
import { OrientationContext } from './OrientationProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const DropdownList = props => {

    const { positions, getPositions } = useContext(PositionContext)
    const { orientations, getOrientations } = useContext(OrientationContext)
    const { subpositions, getSubpositions } = useContext(SubpositionContext)

    useEffect(() => getSubpositions().then(getOrientations).then(getPositions), [])
    
    const [ positionValue, setpositionValue ] = useState("")
    const [ orientationValue, setOrientationValue ] = useState("")
    const [ subpositionValue, setSubpositionValue ] = useState("")

    console.log(orientations)
    console.log(positionValue)

    return (
        <div className="dropdowns">
            <Autocomplete
              id="positions"
              options={positions}
              getOptionLabel={(posish) => posish.name}
              style={{ width: 300 }}
              value={positionValue}
              onChange={(event, newValue) => setpositionValue(newValue)}
              renderInput={(params) => <TextField {...params} label="Position" variant="outlined" />}
            />
            <Autocomplete
              id="orientation"
              options={orientations}
              getOptionLabel={(orient) => {
                  if (orient.dominant === true && (positionValue.id === 1 || 2 ||)) {
                    return "Top"
                  } else {return "Bottom"}
              }}
              style={{ width: 300 }}
              value={orientationValue}
              onChange={(event, newValue) => setOrientationValue(newValue)}
              renderInput={(params) => <TextField {...params} label="Orientation" variant="outlined" />}
            />
            <Autocomplete
              id="subpositions"
              options={subpositions}
              getOptionLabel={(subposish) => subposish.name}
              style={{ width: 300 }}
              value={subpositionValue}
              onChange={(event, newValue) => setsubpositionValue(newValue)}
              renderInput={(params) => <TextField {...params} label="Position" variant="outlined" />}
            />
        </div>

          );
        }