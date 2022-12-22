import React, { Component } from 'react';
import { masterData } from "../../datamodel/data";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export class SupportedTools extends Component {
  static displayName = SupportedTools.name;
  render() {
    return ( 
        <div>
          <div className='env-btn-outer'>
            <Button variant="contained">NEW TOOL</Button>
          </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Tool</th>
                <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
            {masterData.map((data, key) => {
               return (
                <tr key={key}>
                    <td>{data.environmentName}</td>
                    <td>{ data.description}</td>
                </tr>
                 );
              })}
            </tbody>
            </table>
        </div>
    );
  }
}
