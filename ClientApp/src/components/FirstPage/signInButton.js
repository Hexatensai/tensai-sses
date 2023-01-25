import React from "react";
import  {useMsal}  from "@azure/msal-react";
import  { loginRequest } from "../../authConfig";
import tensaiLogo from '../../assets/tensai.png';
import './pageLayout.css'


/**
 * Renders a button which, when selected, will open a popup for login
 */
export default function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    const onLogin = () => {
      window.location.replace("/projects")
    };
    return (
      <div class="container login-wrap" style={{maxWidth:"100%"}}>
        <div class="row">
          <div className="col col-md-5 left-side">
            <div>
              <div className='logo-outer'>
                <img  src={tensaiLogo} alt='tensai-logo'/>
              </div>
              <p className="master-text">Low Code Release Orchestration Platform.</p>
              <p>Simplify enterprise DevOps onboarding - Tool Chain, Technology app ecosysystem. Orchestrate multi releases with transparencey with real-time insights.</p>
            </div>
          </div>
          <div class="col col-md-7">
            <div>
            <button type="button" className="btn btn-primary sign-up">Sign Up</button>
            <button type="button" className="btn btn-primary login"  onClick={onLogin}>Login</button> <br/>
            <button type="button" className="btn btn-primary">Continue with Email</button> <br/>
            <button type="button" className="btn btn-primary">Continue with Github</button> <br/>
            <button type="button" className="btn btn-primary" onClick={()=> handleLogin("popup")}>Continue with Company SSO</button>
            </div>
          </div>
        </div>
      </div>
    );
}