import React, {useEffect, useRef, useState} from 'react';
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

export default function EnvironmentEdit({edit, setEdit, rowData}) {

  const handleClose = () => {
    setEdit(false);
  };

  const baseURL = "https://52.146.8.157:7244/api/environments/";

  const put_id = useRef(null);
  const put_version = useRef(null);
  const put_description = useRef(null);
  const put_name = useRef(null);

  const [putResult, setPutResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  
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

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();
        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(err.message);
      }
      setEdit(false);
    }
  }
  
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  
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
        Modify Environment Details
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
                <span className='col-md-3'>Environment Name:</span>
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