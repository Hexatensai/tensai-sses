import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function Tdropdown({fieldName,name, options, setFormData}) {

  const handleChange = (e) => {
    setFormData(prevFormData => {
      return {...prevFormData, [e.target.name] : e.target.value}
    })
  };

  return (
    <Box sx={{ m: 2, width: "30rem" }}>
        <Typography variant="h6" component="h3">{fieldName}</Typography>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={handleChange}
          sx={{height: "2.8rem", width: "30rem" }}
          MenuProps={MenuProps}
          name = {name}
        >
          {options?.length > 0 ? 
          options?.map((option) => 
          <MenuItem
          key={option}
          value={option}

        >
          {option}
        </MenuItem>
          )

           : 
        <MenuItem >No data Found</MenuItem>
          }
          
        </Select>
    </Box>
  );
}