import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';


    function SupportedTools() {
      const [supportedTools, setSupportedTools] = useState([]);
    
        const fetchData = () => {
         return fetch("https://52.146.8.157:7244/api/SupportTools/")
           .then((response) => response.json())
           .then((data) => setSupportedTools(data));
        }
        useEffect(() => {
          fetchData()
        }, [])
    return ( 
        <div>
          <div className='env-btn-outer'>
            <Button variant="contained" className='btn-style'>NEW TOOL</Button>
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
        </div>
    );

}
export default SupportedTools