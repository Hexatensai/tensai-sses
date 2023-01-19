import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NewTool({open, setOpen, fetchData}) {

   
  const handleClose = () => {
    setOpen(false);
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  let handleSave = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://52.146.8.157:7244/api/supporttools/", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: description,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await fetchData()
    } catch (err) {
    }
    setOpen(false);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        New Tool
        </BootstrapDialogTitle>
        <DialogContent className='dialog-wrap toolschain-outer' dividers>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <label>
            <span className='col-md-3'>Tool:</span>
            <TextField className='col-md-6' id="outlined-basic" label="Tool Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
             variant="outlined" />
          </label>
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <label>
            <span className='col-md-3'>Description:</span>
            <TextField className='col-md-6' id="outlined-basic" label="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined" />
          </label>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" autoFocus onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      
    </div>
  );
}