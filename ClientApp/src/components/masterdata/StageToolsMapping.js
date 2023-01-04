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
       return fetch("https://52.146.8.157:7244/api/stagetool/")
         .then((response) => response.json())
         .then((data) => setStageTools(data));
      }
      const fetchDataStage = () => {
        return fetch("https://52.146.8.157:7244/api/pipelinestages/")
          .then((response) => response.json())
          .then((stage) => setPipelineStages(stage));
       }
      const fetchDataTool = () => {
        return fetch("https://52.146.8.157:7244/api/supporttools/")
          .then((response) => response.json())
          .then((tool) => setSupportedTools(tool));
      }
      useEffect(() => {
        fetchData()
        fetchDataStage()
        fetchDataTool()
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
                {pipelineStages.map((stage, id) => {
                return (
                  <div key={id}>
                    {(() => {
                      if (data.id === stage.id) {
                        return (
                          <div>{stage.name}</div>
                        )
                      }
                      })()}
                  </div>
                );
              })}
              </td>
              <td>
              {supportedTools.map((tool, id) => {
                return (
                  <div key={id}>
                    {(() => {
                      if (data.id === tool.id) {
                        return (
                          <div>{tool.name}</div>
                        )
                      }
                      })()}
                  </div>
                );
              })}
              </td>
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
          <NewStageTool open={open} setOpen={setOpen} />
          <StageToolsMappingEdits edit={edit} setEdit={setEdit} rowData={rowData}/>
      </div>
    );
}
export default StageToolsMapping