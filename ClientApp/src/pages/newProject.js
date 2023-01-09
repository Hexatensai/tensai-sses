import Button from "@mui/material/Button";
import { accordionDetailsClasses, Box, Container, Hidden } from "@mui/material";
import Tdropdown from "../components/tensaiDropdown/Tdropdown";
import { Link } from "react-router-dom";
import TTextField from "../components/TensaitextField/TTextField";
import TCheckBox from "../components/TensaiCheckBox/TCheckBox";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { resolveTripleslashReference } from "typescript";
import { useNavigate } from "react-router-dom";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

const NewProject = () => {
const navigate = useNavigate()
  const [formData, setFormData] = useState({});

  const [categories, setCategory] = useState([]);
  const [stageTools, setStageTools] = useState([]);
  const fetchData = () => {
    return fetch("https://52.146.8.157:7244/api/category/")
      .then((response) => response.json())
      .then((category) => setCategory(category));
  };
  const fetcStageTool = () => {
    return fetch("https://52.146.8.157:7251/api/stagetool/")
      .then((response) => response.json())
      .then((stage) => setStageTools(stage));
  };
  useEffect(() => {
    fetchData();
    fetcStageTool();
  }, []);

  useEffect(()=> {

    console.log(formData)
  
  },[formData])

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
    const res = await fetch("https://52.146.8.157:7251/api/stagetool/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result= await res.json()
    console.log(result);
    navigate("/projects")
  }
  catch(err) {
    // console.log(err);
    alert(err?.title)
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
            setFormData={setFormData}
            name={"name"}
          />
          <Tdropdown
            fieldName={"Category"}
            options={categories || []}
            name={"codeRepo"}
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Application Code Repository"}
            name={"codeRepo"}
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
            name={"dependencyCheck"}
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
            name={"SAST"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "SAST" 
              ) || []
            }
            setFormData={setFormData}
          />
          <Tdropdown
            fieldName={"Dynamic Application Security Scan"}
            name={"DAST"}
            options={
              stageTools?.filter((stage) =>
                stage.pipelinename === "DAST"
              ) || []
            }
            setFormData={setFormData}
          />
          <TCheckBox
            fieldName={"Deployable Environment"}
            label={"Dev"}
            name={"DeployableEnv"}
            setFormData={setFormData}
          />
          <TCheckBox
            fieldName={"Deployements"}
            label={"Requires Deployment"}
            name={"deployments"}
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
// SCM Tool
