import React, { useEffect, useState }  from 'react';
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
import Tdropdown from '../tensaiDropdown/Tdropdown';
import { credentialType } from '../../Constant/BuildandDeployConstant';
import TTextField from "../../components/TensaitextField/TTextField";

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

export default function NewStageTool({open, setOpen, rowData }) {


  const handleClose = () => {
    setOpen(false);
  };

  const [pipelineStages, setPipelineStages] = useState([]);

  const fetchData = () => {
   return fetch("https://52.146.8.157:7244/api/pipelinestages/")
     .then((response) => response.json())
     .then((data) => setPipelineStages(data));
  }

  const [supportedTools, setSupportedTools] = useState([]);
    
  const fetchTool = () => {
   return fetch("https://52.146.8.157:7244/api/supporttools/")
     .then((response) => response.json())
     .then((tool) => setSupportedTools(tool));
  }
  useEffect(() => {
    fetchData()
    fetchTool()
  }, [])

  const [formData, setFormData] = useState({});
  useEffect(()=> {
    console.log(formData)
  },[formData])
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
    const res = await fetch("https://52.146.8.157:7244/api/stagetool/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result= await res.json()
    // console.log(result);
    setOpen(false);
  }
  catch(err) {
    // alert(err?.title)
  }
}

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
            <span className='col-md-3'>Stage:</span>
              <Tdropdown className='col-md-6' options={pipelineStages || []}
              setFormData={setFormData}
              name={"stage_id"}
              type={"id"}
              />
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
            <span className='col-md-3'>Tool:</span>
              <Tdropdown className='col-md-6' 
              options={supportedTools || []}
              setFormData={setFormData}
              name={"tool_id"}
              type={"id"}
              />
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
            <span className='col-md-3'>Name:</span>
            <TTextField className='col-md-6' id="outlined-basic" labelName={"Name"}
            setFormData={setFormData} name={"name"} variant="outlined" />
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
            <TTextField className='col-md-6' id="outlined-basic" labelName={"Description"}
            setFormData={setFormData} name={"description"} variant="outlined" />
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
            <span className='col-md-3'>Credential Type:</span>
            <Tdropdown
            options={credentialType || []} setFormData={setFormData} name={"cred_type"} />
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
            <span className='col-md-3'>Access URL:</span>
            <TTextField className='col-md-6' id="outlined-basic" labelName={"URL" }
            setFormData={setFormData} name={"access_url"} variant="outlined" />
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
            <span className='col-md-3'>User:</span>
            <TTextField className='col-md-6' id="outlined-basic" labelName={"Id"} setFormData={setFormData} name={"cred_user"}  variant="outlined" />
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
            <span className='col-md-3'>Secret:</span>
            <TTextField className='col-md-6' id="outlined-basic" labelName={"Secret"}
            setFormData={setFormData} name={"cred_secret"} variant="outlined" />
          </label>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={onSubmitHandler}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      
    </div>
  );
}