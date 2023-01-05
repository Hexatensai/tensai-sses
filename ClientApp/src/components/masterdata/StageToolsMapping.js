import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NewStageTool from '../Modals/NewStageTool';
import StageToolsMappingEdits from '../Modals/StageToolsMapingEdits';


  function StageToolsMapping() {
    const [stageTools, setStageTools] = useState([]);
    const [pipelineStages, setPipelineStages] = useState([]);
    const [supportedTools, setSupportedTools] = useState([]);
    const [edit, setEdit] = useState(false);
    const [rowData, setRowData] = useState(null);
  
      const fetchData = () => {
       return fetch("https://52.146.8.157:7251/api/stagetool/")
         .then((response) => response.json())
         .then((data) => setStageTools(data));
      }

      useEffect(() => {
        fetchData()
      }, [])

      const [open, setOpen] = React.useState(false);
      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleChange =()=>{
        setEdit(true);
      }

    return ( 
      <div>
        <div className='env-btn-outer'>
          <Button variant="contained" className='btn-style' onClick={handleClickOpen}>NEW TOOL</Button>
        </div>
          <table className="table table-striped">
          <thead>
              <tr>
              <th scope="col">Stage</th>
              <th scope="col">Tool</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Modify</th>
              <th scope="col">Obsolete</th>
              </tr>
          </thead>
          <tbody>
          {stageTools.map((data, key) => {
            return (
            <tr key={key} onClick={()=> setRowData(data)}>
              <td>
                <div>{data.pipelinename}</div>
              </td>
              <td>
                {data.toolname}
              </td>
              <td>{data.stagetoolname}</td>
              <td>{ data.stagetooldescription}</td>
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
          <NewStageTool open={open} setOpen={setOpen} />
          <StageToolsMappingEdits edit={edit} setEdit={setEdit} rowData={rowData}/>
      </div>
    );
}
export default StageToolsMapping