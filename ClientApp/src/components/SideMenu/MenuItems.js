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
          <StorageIcon/>   MasterData 
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border' >
      <ListItemText>
          <AccountTreeIcon/>   Project
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <CreateIcon/>   Pipelines
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <ConstructionIcon/>   ToolsChain
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <SettingsApplicationsIcon/>   AppOps
        </ListItemText>
      </ListItem>
      <ListItem button className='nav-border'>
      <ListItemText>
          <PreviewIcon/>   Hexaview
        </ListItemText>
      </ListItem>
      <ListItem button>
      <ListItemText>
          <ArticleIcon/>   Documentation
        </ListItemText>
      </ListItem>
    </List>
  );
}