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

export default function NewStageTool({open, setOpen }) {


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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessurl, setAccessurl] = useState("");
  const [credtype, setCredtype] = useState("");
  const [creduser, setCreduser] = useState("");
  const [credsecret, setCredsecret] = useState("");
  const [toolid, setToolid] = useState("");
  const [stageid, setStageid] = useState("");
  let handleSave = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://52.146.8.157:7244/api/stagetool/", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: description, 
          access_url: accessurl,
          cred_type: credtype,
          cred_user: creduser,
          cred_secret: credsecret,
          tool_id: 2,
          stage_id:2
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setDescription("");
        setAccessurl("");
        setCredtype("");
        setCreduser("");
        setCredsecret("");
        setToolid("");
        setStageid("");
      } 
    } catch (err) {
      console.log(err);
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
            <span className='col-md-3'>Stage:</span>
            <Tdropdown className='col-md-6' options={pipelineStages || []}
            name={"stage_id"}
            setFormData={setFormData} />
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
            name={"tool_id"}
            setFormData={setFormData}
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
            <TextField className='col-md-6' id="outlined-basic" label="Name" onChange={(e) => setName(e.target.value)} variant="outlined" />
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
            <TextField className='col-md-6' id="outlined-basic" label="Description" onChange={(e) => setDescription(e.target.value)} variant="outlined" />
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
            options={credentialType || []}
            name={"cred_type"}
            setFormData={setFormData}
            onChange={(e) => setCredtype(e.target.value)}/>
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
            <TextField className='col-md-6' id="outlined-basic" label="URL" onChange={(e) => setAccessurl(e.target.value)} variant="outlined" />
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
            <TextField className='col-md-6' id="outlined-basic" label="Id" onChange={(e) => setCreduser(e.target.value)}  variant="outlined" />
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
            <TextField className='col-md-6' id="outlined-basic" label="Secret" onChange={(e) => setCredsecret(e.target.value)}  variant="outlined" />
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