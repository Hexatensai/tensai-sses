import React, {useEffect, useState} from 'react'
import { Typography } from '@mui/material';
import {FormGroup, FormControlLabel, Checkbox, Box} from '@mui/material';

const TCheckBox = ({fieldName, label,id, name, setFormData,type}) => {
    

    const [checked, setChecked] = useState(false)
    const [arr,setArr] = useState([])
    useEffect(() => {
      console.log(arr)
    
    }, [arr])
    
    const handleChange=(e)=>{
        setChecked(!checked)
        type ? setFormData(prevFormData => ({...prevFormData, [e.target.name]: e.target.checked})) :
        setFormData(prevFormData => {
          const keyExist = Object.keys(prevFormData)?.filter(key => key === e.target.name)?.length === 0
          if(keyExist || prevFormData[e.target.name] === '')
          return {...prevFormData, [e.target.name] : `${e.target.value}`}
          if(e.target.checked)
            return {...prevFormData, [e.target.name] : `${prevFormData[e.target.name]},${e.target.value}`}
          else 
            return {...prevFormData, [e.target.name] :prevFormData[e.target.name].split(',').filter(val => val != e.target.value).join(',')}
        })
    }

  return (
    <Box sx={{ m: 2, width: "30rem" }}>
    <FormGroup >
    <Typography variant="h6" component="h3">{fieldName}</Typography>
    <FormControlLabel control={<Checkbox checked={checked} name={name} value={type ? checked : id}
   onChange={handleChange}/>} label={label} />  
    </FormGroup>
    </Box>
  )
}

export default TCheckBox;