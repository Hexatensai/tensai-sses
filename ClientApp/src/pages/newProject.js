import Button from '@mui/material/Button';
import { Box, Container } from "@mui/material";
import Tdropdown from "../components/tensaiDropdown/Tdropdown";
import { artifactoryDropdown, staticCodeAnalysis } from "../Constant/newProjectConstant";
import { dependencyCheck } from "../Constant/newProjectConstant";
import { sast } from "../Constant/newProjectConstant";
import { dast } from "../Constant/newProjectConstant";
import { build } from "../Constant/newProjectConstant";
import { applicationCodeRepository, category } from "../Constant/newProjectConstant";
import { Link } from 'react-router-dom';
import TTextField  from "../components/TensaitextField/TTextField";
import TCheckBox from "../components/TensaiCheckBox/TCheckBox";
import { useState, useEffect } from "react";
import { name } from '@azure/msal-browser/dist/packageMetadata';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const NewProject=()=>{
    const [formData, setFormData] = useState({})

    const [categories, setCategory] = useState([]);
    const [pipelineStages, setPipelineStages] = useState([]);
    const [supportedTools, setSupportedTools] = useState([]);
    const fetchData = () => {
        return fetch("https://52.146.8.157:7249/api/category/")
          .then((response) => response.json())
          .then((category) => setCategory(category));
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

        return(
          <div className="page-outer new-project-wrap">
              <Container>
                  <Box component={"form"}>
                  <p>Please select the right components that matches your application release requirements</p>
                  <TTextField fieldName={"Application/Project"}  setFormData={setFormData} name={"projectName"} />
                  <Tdropdown fieldName={"Category"} options={categories?.map((category) => category.name) || []} name={"codeRepo"} setFormData={setFormData}/>
                  
                  <div>
                  {pipelineStages.map((stage, id) => {
                    return (
                      <div key={id}>
                        {(() => {
                        if (stage.name === 'CodeClone') {
                          return (
                            <div>
                              {supportedTools.map((tool, id) => {
                                return (
                                  <div key={id}>
                                    {(() => {
                                    if (stage.id === tool.id) 
                                      return (
                                        <div>
                                          <Tdropdown fieldName={"Application Code Repository"}  name={"codeRepo"}  options={[tool.name]}  />      
                                        </div>
                                      )
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          ) 
                        }  
                        })()}
                        {(() => {
                        if (stage.name === 'CodeBuild') {
                          return (
                            <div>
                              {supportedTools.map((tool, id) => {
                                return (
                                  <div key={id}>
                                    {(() => {
                                    if (stage.id === tool.id) {
                                      return (
                                        <div>
                                          <Tdropdown fieldName={"Build"} name={"build"}   options={[tool.name]}  />
                                       
                                         
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } 
                        })()}
                        {(() => {
                        if (stage.name === 'CodeAnalysis') {
                          return (
                            <div>
                              {supportedTools.map((tool, id) => {
                                return (
                                  <div key={id}>
                                    {(() => {
                                    if (stage.id === tool.id) {
                                      return (
                                        <div>
                                       
                                          <Tdropdown fieldName={"Static Code Analysis"} name={"staticCode"}  options={[tool.name]}    />
                                         
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } 
                        })()}
                        {(() => {
                        if (stage.name === 'DepedencyCheck') {
                          return (
                            <div>
                              {supportedTools.map((tool, id) => {
                                return (
                                  <div key={id}>
                                    {(() => {
                                    if (stage.id === tool.id) {
                                      return (
                                        <div>
                                          <Tdropdown fieldName={"Dependency Check"}  name={"dependencyCheck"}   options={[tool.name]}/>
                                        
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } 
                        })()}
                         {(() => {
                        if (stage.name === 'ArtifactPublish') {
                          return (
                            <div>
                              {supportedTools.map((tool, id) => {
                                return (
                                  <div key={id}>
                                    {(() => {
                                    if (stage.id === tool.id) {
                                      return (
                                        <div>
                                          <Tdropdown fieldName={"Artifactory"}  name={"artifactory"}     options={[tool.name]}/>
                                      
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        }
                         
                        })()}
                        {(() => {
                        if (stage.name === 'SAST') {
                          return (
                            <div>
                              {supportedTools.map((tool, id) => {
                                return (
                                  <div key={id}>
                                    {(() => {
                                    if (stage.id === tool.id) {
                                      return (
                                        <div>
                                          <Tdropdown fieldName={"SAST / Static Application Security Scan"} name={"SAST"}    options={[tool.name]}/>                                      
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        }
                        })()}
                         {(() => {
                        if (stage.name === 'DAST') {
                          return (
                            <div>
                              {supportedTools.map((tool, id) => {
                                return (
                                  <div key={id}>
                                    {(() => {
                                    if (stage.id === tool.id) {
                                      return (
                                        <div>
                                          <Tdropdown fieldName={"Dynamic Application Security Scan"}  name={"DAST"}   options={[dast]}/>                                       
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        }
                        })()}
                      </div>
                      );
                  })}
                  </div>
                  <TCheckBox fieldName={"Deployable Environment"} label={"Dev"} name={"DeployableEnv"} setFormData={setFormData}/>
                  <TCheckBox fieldName={"Deployements"} label={"Requires Deployment"} name={"deployments"} setFormData={setFormData}/>
              <Button variant="contained">SAVE </Button>
              <Link to="/projects" className='link'>
              <Button style={{marginLeft:"10px"}} variant="contained" >CANCEL</Button>
              </Link>
              </Box>
              </Container>
          </div>
        )
    }
export default NewProject;
