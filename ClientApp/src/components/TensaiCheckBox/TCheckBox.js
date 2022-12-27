import React, {useState} from 'react'
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import {FormGroup, FormControlLabel, Checkbox, Box} from '@mui/material';

const TCheckBox = ({fieldName, label, name, setFormData}) => {
    

    const [checked, setChecked] = useState(false)

    const handleChange=(e)=>{
        setChecked(!checked)
        setFormData(prevFormData => {
                return {...prevFormData, [e.target.name] : !checked}
        })
    }

  return (
    <Box sx={{ m: 2, width: "30rem" }}>
    <FormGroup >
    <Typography variant="h6" component="h3">{fieldName}</Typography>
    <FormControlLabel control={<Checkbox checked={checked} name={name}
   onChange={handleChange}/>} label={label} />  
    </FormGroup>
    </Box>
  )
}

export default TCheckBox;