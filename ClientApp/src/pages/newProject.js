import Button from '@mui/material/Button';
import { accordionDetailsClasses, Box, Container, Hidden } from "@mui/material";
import Tdropdown from "../components/tensaiDropdown/Tdropdown";
import { Link } from 'react-router-dom';
import TTextField  from "../components/TensaitextField/TTextField";
import TCheckBox from "../components/TensaiCheckBox/TCheckBox";
import { useState, useEffect } from "react";
import classNames from "classnames";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const NewProject=()=>{
    const [formData, setFormData] = useState({})

    const [categories, setCategory] = useState([]);
    const [stageTools, setStageTools] = useState([]);
    const fetchData = () => {
        return fetch("https://52.146.8.157:7249/api/category/")
          .then((response) => response.json())
          .then((category) => setCategory(category));
       }
       const fetcStageTool = () => {
        return fetch("https://52.146.8.157:7251/api/stagetool/")
          .then((response) => response.json())
          .then((stage) => setStageTools(stage));
      }
       useEffect(() => {
            fetchData()
            fetcStageTool()
       }, [])
        return(
          <div className="page-outer new-project-wrap">
              <Container>
                  <Box component={"form"}>
                  <p>Please select the right components that matches your application release requirements</p>
                  <TTextField fieldName={"Application/Project"}  setFormData={setFormData} name={"projectName"} />
                  <Tdropdown fieldName={"Category"} options={categories?.map((category) => category.name) || []} name={"codeRepo"}/>
                  <Tdropdown fieldName={"Application Code Repository"} name={"codeRepo"} options={stageTools?.map((stage) => stage.pipelinename === 'CodeClone' ? stage.toolname :  '' ) || []}/>
                  <Tdropdown fieldName={"Build"} name={"build"} options={stageTools?.map((stage) => stage.pipelinename === 'CodeBuild' ? stage.toolname :  '' ) || []}/>
                  <Tdropdown fieldName={"Static Code Analysis"} name={"staticCode"}  options={stageTools?.map((stage) => stage.pipelinename === 'CodeAnalysis' ? stage.toolname :  '' ) || []} />
                  <Tdropdown fieldName={"Dependency Check"}  name={"dependencyCheck"} options={stageTools?.map((stage) => stage.pipelinename === 'DepedencyCheck' ? stage.toolname :  '' ) || []}/>
                  <Tdropdown fieldName={"Artifactory"}  name={"artifactory"} options={stageTools?.map((stage) => stage.pipelinename === 'ArtifactPublish' ? stage.toolname :  '' ) || []}/>
                  <Tdropdown fieldName={"SAST / Static Application Security Scan"} name={"SAST"}  options={stageTools?.map((stage) => stage.pipelinename === 'SAST' ? stage.toolname :  '' ) || []}/> 
                  <Tdropdown fieldName={"Dynamic Application Security Scan"}  name={"DAST"} options={stageTools?.map((stage) => stage.pipelinename === 'DAST' ? stage.toolname: '') || []}/> 
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
// SCM Tool