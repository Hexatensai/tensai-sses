import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NewStage from '../Modals/NewStage';
import PipelineStagesEdits from '../Modals/PipelinesStagesEdits';

function PipelineStages() {
  const [pipelineStages, setPipelineStages] = useState([]);
  const [edit, setEdit] = useState(false);


    const fetchData = () => {
     return fetch("https://52.146.8.157:7246/api/pipelinestages/")
       .then((response) => response.json())
       .then((data) => setPipelineStages(data));
    }
    useEffect(() => {
      fetchData()
    }, [])

    const handleChange =()=>{
      setEdit(true);
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    return ( 
        <div>
          <div className='env-btn-outer'>
          <Button variant="contained" className='btn-style' onClick={handleClickOpen}>NEW STAGE</Button>
          </div>
          <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Stage Name</th>
                <th scope="col">Description</th>
                <th scope="col">Modify</th>
                <th scope="col">Obsolete</th>
                </tr>
            </thead>
            <tbody>
            {pipelineStages.map((data, key) => {
               return (
                <tr key={key}>
                <td>{data.name}</td>
                <td>{ data.description}</td>
                <td>
                <Button variant="contained" className='btn-style' startIcon={<EditIcon />} color="primary" onClick={handleChange}>
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
            <NewStage open={open} setOpen={setOpen} />
            <PipelineStagesEdits edit={edit} setEdit={setEdit}/>
        </div>
    );
}
export default PipelineStages