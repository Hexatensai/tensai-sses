
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import '../custom.css';

  const ToolsChain = () => {
    const [cicds, setCICD] = useState([]);
    const [stageTools, setStageTools] = useState([]);
    const [formData, setFormData] = useState({});
    const fetchCICD = () => {
      return fetch("https://52.146.8.157:7244/api/CICD/")
        .then((response) => response.json())
        .then((cicd) => setCICD(cicd));
    };
    const fetchStageTool = () => {
      return fetch("https://52.146.8.157:7244/api/stagetool/")
        .then((response) => response.json())
        .then((stage) => setStageTools(stage));
    };
    useEffect(() => {
      fetchCICD();
      fetchStageTool();
    }, []);

    return(
      <div className='page-outer' style={{ display: 'flex', flexWrap:'wrap'}}>
        <Card>
          <Card.Body>
            <Card.Title>Repository Management</Card.Title>
            <div className='toolbox-outer'>
                <div className='tools-box'>
                  <label class="control control--checkbox">Github
                    <input type="checkbox" checked="checked"/>
                    <div class="control__indicator"></div>
                  </label>
                </div>
                <div className='tools-box'>
                  <label class="control control--checkbox">Gitlab
                    <input type="checkbox" checked="checked"/>
                    <div class="control__indicator"></div>
                  </label>
                </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>CI/CD</Card.Title>
            <div className='toolbox-outer'>
              {cicds.map((cicd, key) => {
                return (
                <div className='tools-box'>
                    <label class="control control--checkbox">{cicd.name}
                      <input type="checkbox" checked="checked"/>
                      <div class="control__indicator"></div>
                    </label>
                </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Artifacts Management</Card.Title>
            <div className='toolbox-outer'>
            {stageTools.map((stage, key) => {
              if (stage.pipelinename === "ArtifactPublish"){
                return (
                  <div className='tools-box'>
                      <label class="control control--checkbox">{stage.toolname}
                        <input type="checkbox" checked="checked"/>
                        <div class="control__indicator"></div>
                      </label>
                  </div>
                  );
                }
              })}
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Code Security</Card.Title>
            <div className='toolbox-outer'>
            {stageTools.map((stage, key) => {
              if (stage.pipelinename === "SAST" ){
                return (
                  <div className='tools-box'>
                      <label class="control control--checkbox">{stage.toolname}
                        <input type="checkbox" checked="checked"/>
                        <div class="control__indicator"></div>
                      </label>
                  </div>
                  );
                }
              })}
              <div className='tools-box'>
                  <label class="control control--checkbox">Snyk
                    <input type="checkbox" checked="checked"/>
                    <div class="control__indicator"></div>
                  </label>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Configuration Management</Card.Title>
            <div className='toolbox-outer'>
              <div className='tools-box'>
                <label class="control control--checkbox">Ansible
                  <input type="checkbox" checked="checked"/>
                  <div class="control__indicator"></div>
                </label>
              </div>
              <div className='tools-box'>
                <label class="control control--checkbox">Chef
                  <input type="checkbox" checked="checked"/>
                  <div class="control__indicator"></div>
                </label>
              </div>
              <div className='tools-box'>
                <label class="control control--checkbox">Puppet
                  <input type="checkbox" checked="checked"/>
                  <div class="control__indicator"></div>
                </label>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div> 
    )
  }
  
  export default ToolsChain;