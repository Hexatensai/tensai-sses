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



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const NewProject=()=>{
    const [formData, setFormData] = useState({})

    useEffect(() => {
        console.log(formData)
    }, [formData])
    
        return(
            <div className="page-outer new-project-wrap">
                <Container>
                    <Box component={"form"}>
                    <p>Please select the right components that matches your application release requirements</p>
                    <TTextField fieldName={"Application/Project"}  setFormData={setFormData} name={"projectName"} />
                    <Tdropdown fieldName={"Category"} options={category} name={"codeRepo"} setFormData={setFormData}/>
                    <Tdropdown fieldName={"Application Code Repository"} options={applicationCodeRepository} name={"codeRepo"} setFormData={setFormData}/>
                    <Tdropdown fieldName={"Build"} options={build} name={"build"} setFormData={setFormData}/>
                    <Tdropdown fieldName={"Static Code Analysis"} options={staticCodeAnalysis} name={"staticCode"} setFormData={setFormData}/>
                    <Tdropdown fieldName={"Dependency Check"} options={dependencyCheck} name={"dependencyCheck"} setFormData={setFormData}/>
                    <Tdropdown fieldName={"Artifactory"} options={artifactoryDropdown} name={"artifactory"} setFormData={setFormData}/>
                    <Tdropdown fieldName={"SAST / Static Application Security Scan"} options={sast} name={"SAST"} setFormData={setFormData}/>
                    <Tdropdown fieldName={"Dynamic Application Security Scan"} options={dast} name={"DAST"} setFormData={setFormData}/>
                    <TCheckBox fieldName={"Deployable Environment"} label={"QA"} name={"DeployableEnv"} setFormData={setFormData}/>
                    <TCheckBox fieldName={"Tests"} label={"Has Automated Tests"} name={"tests"} setFormData={setFormData}/>
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
