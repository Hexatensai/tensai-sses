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

export default function StageToolEdit({edit, setEdit, rowData}) {


  const handleClose = () => {
    setEdit(false);
  };

  const baseURL = "https://52.146.8.157:7244/api/stagetool/";

  const put_id = useRef(null);
  const put_version = useRef(null);
  const put_isActive = useRef(null);
  const put_credType = useRef(null);
  const put_description = useRef(null);
  const put_name = useRef(null);
  const put_stageid = useRef(null);
  const put_toolid = useRef(null);
  const put_accessurl = useRef(null);
  const put_credUser = useRef(null);
  const put_credSecret = useRef(null);

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
        stage_id: parseInt(put_stageid.current.value),
        tool_id: parseInt(put_toolid.current.value),
        accessurl: put_accessurl.current.value,
        cred_user: put_credUser.current.value,
        cred_secret: put_credSecret.current.value,
        version: parseInt(put_version.current.value),
        is_active: Boolean(put_isActive.current.value),
        id: parseInt(put_id.current.value),
        cred_type: put_credType.current.value
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
  
  const [stagetoolname, setName] = useState()
  const [stagetooldescription, setDescription] = useState()
  const [stageid, setStageid] = useState()
  const [toolid, setToolid] = useState()
  const [accessurl, setAccessurl] = useState()
  const [cred_user, setCreduser] = useState()
  const [cred_secret, setCredsecret] = useState()
  const [cred_type, setCredType] = useState()
  
  useEffect(()=> {
    setStageid(rowData?.stageid)
    setToolid(rowData?.toolid)
    setName(rowData?.stagetoolname)
    setDescription(rowData?.stagetooldescription)
    setAccessurl(rowData?.accessurl)
    setCreduser(rowData?.cred_user)
    setCredsecret(rowData?.cred_secret)
    setCredType(rowData?.cred_type)
  },[rowData])

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={edit}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modify Tool
        </BootstrapDialogTitle>
        <DialogContent className='dialog-wrap toolschain-outer' dividers>
        <input type="number" style={{display: "none"}} ref={put_id} value={rowData?.id}  placeholder="Id" />
        <input type="number" style={{display: "none"}} ref={put_version} value={rowData?.version}  placeholder="Version" />
        <input type="text" style={{display: "none"}} ref={put_isActive} value={rowData?.isActive}  placeholder="isActive" />
        <input type="text" className="form-control" ref={put_credType} value={cred_type} onChange={(e)=> setCredType(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_stageid} value={stageid} onChange={(e)=> setStageid(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_toolid} value={toolid} onChange={(e)=> setToolid(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_name} value={stagetoolname} onChange={(e)=> setName(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_description} value={stagetooldescription} onChange={(e)=> setDescription(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_accessurl} value={accessurl} onChange={(e)=> setAccessurl(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_credUser} value={cred_user} onChange={(e)=> setCreduser(e.target.value)} />
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
            <input type="text" className="form-control" ref={put_credSecret} value={cred_secret} onChange={(e)=> setCredsecret(e.target.value)} />
          </label>
          <p>Leave the fields (<b>AccessURL, User and Secret</b>) blank or as it is, if you do not want to change</p>
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