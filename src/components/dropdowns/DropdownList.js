import react, {useContext, useState, useEffect} from 'react'
import { PositionContext } from './PositionProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { OrientandSubDropdown, OrientandSubDropwdown } from "./OrientandSubDropdown"

export const DropdownList = props => {

    const { positions, getPositions } = useContext(PositionContext)

    useEffect(() => getPositions(), [])

    const [ positionValue, setpositionValue ] = useState({})

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
            {positionValue !== "" ? <OrientandSubDropdown key={1} positionValue={positionValue} /> : ""}
        </div>

          );
        }