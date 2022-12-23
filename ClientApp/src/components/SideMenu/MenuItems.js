import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './MenuItems.css';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CreateIcon from '@mui/icons-material/Create';
import StorageIcon from '@mui/icons-material/Storage';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ArticleIcon from '@mui/icons-material/Article';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from "react-router-dom";

const style = {
  width: '100%',
  maxWidth: 200,
  bgcolor: '#664bee',
  marginTop: '60px',
  color: '#ffffff'
};

export default function MenuItems() {

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button className='nav-border' >
      <ListItemText>
          <AccountTreeIcon/>  
          <Link to="/projects" className='redirect-link'>Project</Link>  
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <CreateIcon/>  
          <Link to="/pipelines" className='redirect-link'>Pipelines</Link> 
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <ConstructionIcon/> 
          <Link to="/toolsChain" className='redirect-link'>ToolsChain</Link> 
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <SettingsApplicationsIcon/>  
          <a className='redirect-link' title='AppOps'>AppOps</a>
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <PreviewIcon/>   
          <a className='redirect-link' title="Hexaview">Hexaview</a>
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border' >
        <ListItemText>
          <StorageIcon/>  
          <Link to="/master-data" className='redirect-link'>MasterData</Link> 
        </ListItemText>
      </ListItem>
      <ListItem button>
      <ListItemText>
          <ArticleIcon/>  
          <Link to="/communityforum" className='redirect-link'>Documentation</Link> 
        </ListItemText>
      </ListItem>
    </List>
  );
}