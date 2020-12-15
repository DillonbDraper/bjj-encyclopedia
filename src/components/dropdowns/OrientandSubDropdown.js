import { useContext, useEffect } from 'react'
import { SubpositionContext } from './SubpositionProvider'
import { OrientationContext } from './OrientationProvider'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const OrientandSubDropdown = ({ positionValue, orientationValue, setOrientationValue, subpositionValue, setsubpositionValue }) => {
    const { orientations, getOrientations } = useContext(OrientationContext)
    const { subpositions, getSubpositions } = useContext(SubpositionContext)

    useEffect(() => getSubpositions().then(getOrientations), [])


    //Filters subpositions down to only display those that match the currently chosen position
    let filteredSubposition = []
    if (positionValue === null) {
        filteredSubposition = []
    } else {
    filteredSubposition = subpositions.filter(sub => sub.positionId === positionValue.id)
    }


    if (positionValue === null) {
        return (
        <> 
            <Autocomplete
            id="orientation"
            options={[]} 
             renderInput={(params) => <TextField {...params} label="Orientation" variant="outlined" />}
             style={{ width: 300 }}
             />
            <Autocomplete 
            id="subpositions"
            options={[]}
            renderInput={(params) => <TextField {...params} label="Subposition" variant="outlined" />}
            style={{ width: 300 }}
            />
        
        </>)
    }
    return (
        <>
            <Autocomplete
                id="orientation"
                //Disables this dropdown if position === standing, which makes these children irrelevant
                disabled={positionValue.id === 3 ? true : false}
                options={orientations}
                getOptionLabel={(orient) => {
                    if (orient === 0 || !orient) {
                        return ""
                    }

                    //Uses correct word labels for different orientation based on current position
                    if (orient.dominant === true && (positionValue.id === 1 || positionValue.id === 2 || positionValue.id === 4 || positionValue.id === 5 || positionValue.id === 7 || positionValue.id === 9)) {
                        return "Top"
                    } else if (orient.dominant === true && (positionValue.id === 6 || positionValue.id === 8)) {
                        return "Superior"
                    } else if (orient.dominant === false && (positionValue.id === 1 || positionValue.id === 2 || positionValue.id === 4 || positionValue.id === 5 || positionValue.id === 7 || positionValue.id === 9)) {
                        return "Bottom"
                    } else if (orient.dominant === false && (positionValue.id === 6 || positionValue.id === 8)) {
                        return "Inferior"
                    }
                }}
                style={{ width: 300 }}
                value={orientationValue}
                onChange={(event, newValue) => setOrientationValue(newValue)}
                renderInput={(params) => <TextField {...params} label="Orientation" variant="outlined" />}
            />
            <Autocomplete
                id="subpositions"
                disabled={positionValue.id === 3 ? true : false}
                options={filteredSubposition}
                getOptionLabel={(subposish) => { 
                    if (subposish === 0 || !subposish) {
                        return ""
                    } else {
                        return subposish.name
                    }
                }}
                style={{ width: 300 }}
                value={subpositionValue}
                onChange={(event, newValue) => setsubpositionValue(newValue)}
                renderInput={(params) => <TextField {...params} label="Subposition" variant="outlined" />}
            />
        </>
    )

}