import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Tdropdown from "../tensaiDropdown/Tdropdown";
import { branch, environment } from "../../Constant/BuildandDeployConstant";
import { useEffect, useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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

export default function BuildandDeployModal({ open, setOpen }) {
  const [formData, setFormData] = useState({});
  const [stageTools, setStageTools] = useState(null);

  const fetchData = () => {
    return fetch("https://52.146.8.157:7244/api/stagetool/")
      .then((response) => response.json())
      .then((data) => setStageTools(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://52.146.8.157:7244/api/PipelineHistory", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Basic YWRtaW46WUlWUlZ0OWhkZVQ5RDNLaHJONHU="
        },
      });
      const result = await res.json();
    } catch (err) {
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Build Application
        </BootstrapDialogTitle>
        <DialogContent className="dialog-wrap toolschain-outer" dividers>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <label>
              <span className="col-md-3">Application Repository:</span>
              <input type="text" className="form-control" style={{marginLeft:"2rem", maxWidth:"480px"}}
              disabled setFormData={setFormData}
              labelName={"Application Repository"}
              defaultValue={stageTools?.[7]?.accessurl}
              name={"applicationURL"}
              />
            </label>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <label>
              <span className="col-md-3">Branch:</span>
              <Tdropdown options={branch} setFormData={setFormData}
               name={"branch_name"}
               />
            </label>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <label>
              <span className="col-md-3">Environment:</span>
              <Tdropdown options={environment} setFormData={setFormData}
              name={"environment_name"} />
            </label>
          </Box>
          <label>
            <span className="col-md-3">Release Candidate:</span>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
            ></input>
          </label>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={onSubmitHandler}
          >
            Build
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
