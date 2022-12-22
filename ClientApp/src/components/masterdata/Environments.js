import React, { Component } from 'react';
import { masterData } from "../../datamodel/data";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export class Environments extends Component {
  static displayName = Environments.name;
  render() {
    return ( 
        <div>
          <div className='env-btn-outer'>
            <Button variant="contained">New Environment</Button>
          </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Environment Name</th>
                <th scope="col">Description</th>
                <th scope="col">To Modify</th>
                <th scope="col">To Obsolete</th>
                </tr>
            </thead>
            <tbody>
            {masterData.map((data, key) => {
               return (
                <tr key={key}>
                <td>{data.environmentName}</td>
                <td>{ data.description}</td>
                <td>
                <Button variant="contained" startIcon={<EditIcon />} color="primary">
                  Edit
                </Button>
                </td>
                <td>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
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
