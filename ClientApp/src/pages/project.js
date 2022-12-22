import React, { Component } from 'react';
import { masterData } from "../datamodel/data";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export class Project extends Component {
  static displayName = Project.name;
  render() {
    return ( 
        <div>
          <div className='env-btn-outer'>
            <Button variant="contained">NEW PROJECT</Button>
          </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">SCM</th>
                <th scope="col">Deployment</th>
                <th scope="col">To Obsolete</th>
                </tr>
            </thead>
            <tbody>
            {masterData.map((data, key) => {
               return (
                <tr key={key}>
                    <td>{data.environmentName}</td>
                    <td>{ data.description}</td>
                    <td>TensaiGitHub</td>
                    <td>Opted</td>
                    <td>
                    <Button variant="contained" startIcon={<EditIcon />} color="primary">
                    Edit
                    </Button>
                    </td>
                </tr>
                 );
              })}
            </tbody>
            </table>
        </div>
    );
  }
}
