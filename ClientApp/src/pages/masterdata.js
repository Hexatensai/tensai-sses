
import React, { Component } from 'react';
import { Environments } from '../components/masterdata/Environments';
import { PipelineStages } from '../components/masterdata/PipelineStages';
import { StageToolsMapping } from '../components/masterdata/StageToolsMapping';
import { SupportedTools } from '../components/masterdata/SupportedTools';
import '../custom.css';

export class MasterData extends Component {
  static displayName = MasterData.name;
    render(){
      return(
        <div className="tabs  page-outer">
         <Tabs>
           <Tab label="Environments">
             <div>
               <Environments />
             </div>
           </Tab>
           <Tab label="Pipeline Stages">
             <div>
               <PipelineStages />
             </div>
           </Tab>
           <Tab label="Stage-Tools Mapping">
             <div>
               <StageToolsMapping />
             </div>
           </Tab>
           <Tab label="Supported Tools">
             <div>            
               <SupportedTools />
             </div>
           </Tab>
         </Tabs>
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
   