import React,{useEffect, useRef, useState} from 'react';
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

export default function PipelineStageEdit({edit, setEdit, rowData, fetchData}) {

  const [name, setName] = useState()
  const [description, setDescription] = useState()

  const handleClose = () => {
    setEdit(false);
  };

  const baseURL = "https://52.146.8.157:7244/api/pipelinestages/";

  const put_id = useRef(null);
  const put_version = useRef(null);
  const put_description = useRef(null);
  const put_name = useRef(null);

  
  async function putData() {
    const id = put_id.current.value;
    if (id) {
      const putData = {
        name: put_name.current.value,
        description: put_description.current.value,
        version:parseInt(put_version.current.value),
        id: parseInt(put_id.current.value)
      };

      try {
        const res = await fetch(`${baseURL}${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(putData),
        });
        await fetchData()
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

      } catch (err) {
        
      }
      setEdit(false);
    }
  }

  
  useEffect(()=> {
    setName(rowData?.name)
    setDescription(rowData?.description)
  },[rowData])

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={edit}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modify Stage
        </BootstrapDialogTitle>
        <DialogContent className='dialog-wrap toolschain-outer' dividers>
        <input type="number" style={{display: "none"}} ref={put_id} value={rowData?.id}  placeholder="Id" />
        <input type="number" style={{display: "none"}} ref={put_version} value={rowData?.version}  placeholder="Version" />
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <label>
            <span className='col-md-3'>Stage:</span>
            <input type="text" className="form-control" ref={put_name} value={name} onChange={(e)=> setName(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_description} value={description} onChange={(e)=> setDescription(e.target.value)} />
          </label>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" autoFocus onClick={putData}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      
    </div>
  );
}