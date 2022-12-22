import React, { Component } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export class Document extends Component {
  static displayName = Document.name;
  render() {
    return (  
     <div className='community-forum-outer page-outer'>
      <h2>Community Forum</h2>
      <Stack className='alert-outer' sx={{ width: '100%' }} spacing={2}>        
        <Alert severity="success"><strong>Documentation !</strong> &nbsp;&nbsp;Coming Soon</Alert>
        <Alert severity="info"><strong>Blog !</strong>  &nbsp;&nbsp;Under Development</Alert>
        <Alert severity="warning"><strong>Support</strong> &nbsp;&nbsp;Chatbot here or Please call us 1800 1234 5678</Alert>
        <Alert severity="error"><strong>Issues ?</strong>   &nbsp;&nbsp;Send details to tensai@hexaware.com</Alert>
      </Stack>
     </div>
    );
  }
}
