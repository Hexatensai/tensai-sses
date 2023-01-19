import React from 'react'
import { TextField, Typography  } from '@mui/material'
import { Box } from '@mui/system'

const TTextField = ({fieldName, setFormData, name, labelName, defaultValue }) => {
  
    const handleChange=(e)=>{
        setFormData(prevFormData => {
                return {...prevFormData, [e.target.name] : e.target.value}
        })
    }
    
    return (
    <Box sx={{ m: 2, width: "30rem" }}
    noValidate
    autoComplete="off"
  >
    <Typography variant="h6" component="h3">{fieldName}</Typography>
      <TextField sx={{ width: "30rem"}} className='col-md-3' id="outlined-basic" label = {labelName} variant="outlined" name={name} onChange={handleChange} defaultValue={defaultValue} />
  </Box>
  )
}
export default TTextField;
