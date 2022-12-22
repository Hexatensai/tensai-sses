import React, { Component } from 'react';
import { masterData } from "../datamodel/data";
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';

export class Pipelines extends Component {
  static displayName = Pipelines.name;
  render() {
    return ( 
        <div className='page-outer'>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
                <th scope="col">History</th>
                <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody>
            {masterData.map((data, key) => {
               return (
                <tr key={key}>
                    <td>{data.environmentName}</td>
                    <td>{ data.description}</td>
                    <td>
                    <Button variant="contained" color="primary">
                       BUILD & DEPLOY
                    </Button>
                    </td>
                    <td><HistoryIcon color="primary" fontSize="large"/></td>
                    <td><InfoIcon color="primary" fontSize="large"/></td>
                </tr>
                 );
              })}
            </tbody>
            </table>
        </div>
    );
  }
}
