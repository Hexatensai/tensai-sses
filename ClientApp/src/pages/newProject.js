import Button from "@mui/material/Button";
import {  Box, Container } from "@mui/material";
import Tdropdown from "../components/tensaiDropdown/Tdropdown";
import { Link } from "react-router-dom";
import TTextField from "../components/TensaitextField/TTextField";
import TCheckBox from "../components/TensaiCheckBox/TCheckBox";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
const navigate = useNavigate()
  const [formData, setFormData] = useState({});

  const [categories, setCategory] = useState([]);
  const [stageTools, setStageTools] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const fetchData = () => {
    return fetch("https://52.146.8.157:7244/api/category/")
      .then((response) => response.json())
      .then((category) => setCategory(category));
  };
  const fetchEnvironments = () => {
    return fetch("https://52.146.8.157:7244/api/environments/")
      .then((response) => response.json())
      .then((environment) => setEnvironments(environment));
  };
  const fetcStageTool = () => {
    return fetch("https://52.146.8.157:7244/api/stagetool/")
      .then((response) => response.json())
      .then((stage) => setStageTools(stage));
  };
  useEffect(() => {
    fetchData();
    fetcStageTool();
    fetchEnvironments();
  }, []);

  useEffect(()=> {
    console.log(formData)
  
  },[formData])

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
    const res = await fetch("https://52.146.8.157:7244/api/project/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    navigate("/projects")
  }
  catch(err) {
  }
}

  return (
    <div className="page-outer new-project-wrap">
      <Container>
        <Box component={"form"}>
          <p>
            Please select the right components that matches your application
            release requirements
          </p>
          <TTextField
            fieldName={"Application/Project"}
            name={"name"}
            setFormData={setFormData}
            labelName={"Project Name"}
          />
            <TTextField
              fieldName={"Description"}
              name={"description"}
              setFormData={setFormData}
              labelName={"Project Description"}
            />
          <Tdropdown
            fieldName={"Category"}
            options={categories || []}
            name={"category"}
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Application Code Repository"}
            name={"scm_tool"}
            options={
              stageTools?.filter(stage =>
                stage.pipelinename === "CodeClone"
              )
            }
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Build"}
            name={"build"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "CodeBuild"
              ) || []
            }
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Static Code Analysis"}
            name={"code_analysis"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "CodeAnalysis"
              ) || []
            }
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Dependency Check"}
            name={"dependency_check"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "DepedencyCheck"
              ) || []
            }
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Artifactory"}
            name={"artifactory"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "ArtifactPublish"
              ) || []
            }
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"SAST / Static Application Security Scan"}
            name={"sast"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "SAST" 
              ) || []
            }
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Dynamic Application Security Scan"}
            name={"dast"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "DAST"
              ) || []
            }
            setFormData={setFormData}
          />
          <div>
            <label style={{fontWeight: "500"}}>Deployable Environment</label>
            <div className="checkbox-outer">
              {environments.map((environment, id) => {
                return ( 
                <TCheckBox
                  id={environment.id}
                  label={environment.name}
                  name={"project_deploy_env"}
                  setFormData={setFormData}
                />
                );
              })}
            </div>
          </div>
          <TCheckBox
            fieldName={"Deployements"}
            type={'deploy'}
            label={"Requires Deployment"}
            name={"deploy"}
            setFormData={setFormData}
          />
          <Button variant="contained" onClick={onSubmitHandler}>SAVE </Button>
          <Link to="/projects" className="link">
            <Button style={{ marginLeft: "10px" }} variant="contained">
              CANCEL
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  );
};
export default NewProject;

