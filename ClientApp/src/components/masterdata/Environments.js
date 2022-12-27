import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NewEnvironment from '../Modals/NewEnvironment';
import EnvironmentEdits from '../Modals/EnvironmentEdits';


function Environments() {
  const [environments, setEnvironments] = useState([]);
  const[edit, setEdit] = useState(false);

    const fetchData = () => {
     return fetch("https://52.146.8.157:7244/api/environments")
       .then((response) => response.json())
       .then((data) => setEnvironments(data));
    }
    useEffect(() => {
      fetchData()
    }, [])

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

   
    const handleChange = () =>{
      setEdit(true);
      console.log("Clicked");
    };

    return ( 
        <div>
          <div className='env-btn-outer'>
            <Button variant="contained" className='btn-style' onClick={handleClickOpen}>New Environment</Button>
          </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Environment Name</th>
                <th scope="col">Description</th>
                <th scope="col">Modify</th>
                <th scope="col">Obsolete</th>
                </tr>
            </thead>
            <tbody>
            {environments.map((data, key) => {
               return (
                <tr key={key}>
                <td>{data.name}</td>
                <td>{ data.description}</td>
                <td>
                <Button variant="contained" className='btn-style' startIcon={<EditIcon />}
                color="primary" onClick={handleChange}>
                  Edit
                </Button>
                </td>
                <td>
                <Button variant="outlined" className='btn-style' startIcon={<DeleteIcon />}>
                  Delete
                </Button>
                </td>
                </tr>
                 );
              })}
            </tbody>
            </table>
            <NewEnvironment open={open} setOpen={setOpen} />
            <EnvironmentEdits edit={edit} setEdit={setEdit} />
        </div>
    );

}
export default Environments