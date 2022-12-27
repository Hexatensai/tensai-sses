import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Tdropdown from '../tensaiDropdown/Tdropdown';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

export default function BuildandDeployModal({open, setOpen}) {


  const handleClose = () => {
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
          Build Application
        </BootstrapDialogTitle>
        <DialogContent className='dialog-wrap' dividers>
          <Typography gutterBottom>
            Application Repository:
          <Tdropdown/>
          </Typography>
          <Typography gutterBottom>
            Branch:
          <Tdropdown/>
          </Typography>
          <Typography gutterBottom>
            Environment:
          <Tdropdown/>
          </Typography>
        Release Candidate:
        <Checkbox {...label} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" autoFocus onClick={handleClose}>
            Build
          </Button>
        </DialogActions>
      </BootstrapDialog>
      
    </div>
  );
}