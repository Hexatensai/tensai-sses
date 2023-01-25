import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import '../custom.css';

function Project() {
    const [projects, setProjects] = useState([]);

    const fetchData = () => {
     return fetch("https://52.146.8.157:7244/api/Project/")
       .then((response) => response.json())
       .then((data) => setProjects(data));
    }
    useEffect(() => {
      fetchData()
    }, [])
    return ( 
        <div className='page-outer'>
          <div className='env-btn-outer'>
          <Link to="/project" className='link' >
            <Button variant="contained">NEW PROJECT</Button>
            </Link>
          </div>
            <table className="table table-striped" >
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th  scope="col" style={{display: 'flex',justifyContent:'center', alignItems: 'center'}}>SCM</th>
                <th scope="col">Deployment</th>
                <th scope="col">Modify</th>
                </tr>
            </thead>
            <tbody>
            {projects.map((data, key) => {
               return (
                <tr key={key}>
                    <td>
                      <a href="/pipelines" className='link-text' title='name'>{data.name}</a>
                    </td>
                    <td>
                      {data.category}
                    </td>
                    <td>{data.scm_tool}</td>
                    <td>
                    {(() => {
                    if (data.deploy === true) {
                      return (
                        <div>Opted</div>
                      )
                    } else {
                      return (
                        <div>None</div>
                      )
                    }
                    })()}
                    </td>
                    <td>
                    <Button variant="contained" className='btn-style' startIcon={<EditIcon />} color="primary">
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
export default Project