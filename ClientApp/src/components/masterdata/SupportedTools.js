import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import NewTool from '../Modals/NewTool';


    function SupportedTools() {
      const [supportedTools, setSupportedTools] = useState([]);
    
        const fetchData = () => {
         return fetch("https://52.146.8.157:7246/api/supporttools/")
           .then((response) => response.json())
           .then((data) => setSupportedTools(data));
        }
        useEffect(() => {
          fetchData()
        }, [])

        const [open, setOpen] = React.useState(false);
        const handleClickOpen = () => {
          setOpen(true);
        };  
    return ( 
        <div>
          <div className='env-btn-outer'>
            <Button variant="contained" className='btn-style' onClick={handleClickOpen}>NEW TOOL</Button>
          </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Tool</th>
                <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
            {supportedTools.map((data, key) => {
               return (
                <tr key={key}>
                    <td>{data.name}</td>
                    <td>{ data.description}</td>
                </tr>
                 );
              })}
            </tbody>
            </table>
            <NewTool open={open} setOpen={setOpen} />
        </div>
    );

}
export default SupportedTools