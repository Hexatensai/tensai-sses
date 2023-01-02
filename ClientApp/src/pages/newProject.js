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
          .then((data) => setCategory(data));
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
                  {/* <Tdropdown fieldName={"Category"} options={category} name={"codeRepo"} setFormData={setFormData}/> */}
                  {categories.map((category, id) => {
                    return (
                      <div key={id}>
                        <Tdropdown fieldName={"Category"} options={category.name} name={"category"} />
                      </div>
                     );
                  })}                
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
                                    if (stage.id === tool.id) {
                                      return (
                                        <div>
                                          {tool.name}
                                          <Tdropdown fieldName={"Application Code Repository"}  name={"codeRepo"} options={tool.name}/> 
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          ) 
                        }  else {
                          return (
                            <Tdropdown fieldName={"Application Code Repository"}  name={"codeRepo"} options="---Not Applicable---" /> 
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
                                          <Tdropdown fieldName={"Build"} options={tool.name} name={"build"} setFormData={setFormData}/>
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } else {
                          return (
                            <Tdropdown fieldName={"Build"}  name={"build"} options="---Not Applicable---" /> 
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
                                          <Tdropdown fieldName={"Static Code Analysis"} options={tool.name} name={"staticCode"}/>
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } else {
                          return (
                            <Tdropdown fieldName={"Static Code Analysis"}  name={"staticCode"} options="---Not Applicable---" /> 
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
                                          <Tdropdown fieldName={"Dependency Check"} options={tool.name} name={"dependencyCheck"}/>
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } else {
                          return (
                            <Tdropdown fieldName={"Dependency Check"}  name={"dependencyCheck"} options="---Not Applicable---" /> 
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
                                          <Tdropdown fieldName={"Artifactory"} options={tool.name} name={"artifactory"} />
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
                         else {
                          return (
                            <Tdropdown fieldName={"Artifactory"}  name={"Artifactory"} options="---Not Applicable---" /> 
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
                                          <Tdropdown fieldName={"SAST / Static Application Security Scan"} options={tool.name} name={"SAST"}/>
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } else {
                          return (
                            <Tdropdown fieldName={"SAST / Static Application Security Scan"}  name={"SAST"} options="---Not Applicable---" /> 
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
                                          <Tdropdown fieldName={"Dynamic Application Security Scan"} options={dast} name={"DAST"}/>
                                        </div>
                                      )
                                    }
                                    })()}
                                  </div>
                                );
                              })}
                            </div>
                          )
                        } else {
                          return (
                            <Tdropdown fieldName={"Dynamic Application Security Scan"}  name={"DAST"} options="---Not Applicable---" /> 
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
