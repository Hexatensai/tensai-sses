import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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


// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function Tdropdown({fieldName,name, options, setFormData}) {
  const theme = useTheme();

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
          // value={personName}
          onChange={handleChange}
          sx={{height: "2.8rem", width: "30rem" }}
          MenuProps={MenuProps}
          name = {name}
        //   placeholder={"Select"}
        >
          {options?.map((option) => (
            <MenuItem
              key={option}
              value={option}
              // style={getStyles(option, personName, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
    </Box>
  );
}