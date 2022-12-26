
import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import '../custom.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export class ToolsChain extends Component {
  static displayName = ToolsChain.name;
    render(){
      return(
        <div className='toolschain-outer page-outer'>
          <h2 className='github-text'>Managing GitHub</h2>
          <div className="tabs">
            <Tabs>
              <Tab label="REPOSITORY">
                <div>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <label>
                      <span className='col-md-3'>Onwer/Organization Name:</span>
                      <TextField className='col-md-3' id="outlined-basic" label="Name" variant="outlined" />
                    </label>
                  </Box>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <label>
                    <span className='col-md-3'>Repository Name:</span>
                      <TextField className='col-md-3' id="outlined-basic" label="Repository" variant="outlined" />
                    </label>
                  </Box>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" className='btn-style'>Create</Button>
                    <Button variant="outlined" className='btn-style'>Cancel</Button>
                  </Stack>
                </div>
              </Tab>
              <Tab label="WEBHOOKS">
              <div>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <label>
                    <span className='col-md-3'>Onwer/Organization Name:</span>
                    <TextField id="outlined-basic" className='col-md-3'label="Name" variant="outlined" />
                  </label>
                </Box>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <label>
                  <span className='col-md-3'>Repository Name:</span>
                    <TextField className='col-md-3' id="outlined-basic" label="Repository" variant="outlined" />
                  </label>
                </Box>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <label>
                  <span className='col-md-3'>Hook URL:</span>
                    <TextField id="outlined-basic" className='col-md-3' label="Url" variant="outlined" />
                  </label>
                </Box>
                <label>
                  <span className='col-md-3'>Subscribe Pullrequest Event:</span>
                  <input className="form-check-input" type="checkbox" value="" ></input>
                </label>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" className='btn-style'>Add</Button>
                  <Button variant="outlined" className='btn-style'>Cancel</Button>
                </Stack>
                </div>
              </Tab>
              </Tabs>
          </div>
        </div> 
      )
    }
  }
  
  class Tabs extends React.Component{
    state ={
      activeTab: this.props.children[0].props.label
    }
    changeTab = (tab) => {
  
      this.setState({ activeTab: tab });
    };
    render(){
      
      let content;
      let buttons = [];
      return (
        <div>
          {React.Children.map(this.props.children, child =>{
            buttons.push(child.props.label)
            if (child.props.label === this.state.activeTab) content = child.props.children
          })}
           
          <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
          <div className="tab-content">{content}</div>
          
        </div>
      );
    }
  }
  
  const TabButtons = ({buttons, changeTab, activeTab}) =>{
     
    return(
      <div className="tab-buttons">
      {buttons.map(button =>{
         return <button className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
      })}
      </div>
    )
  }
  
  const Tab = props =>{
    return(
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }
   