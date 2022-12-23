import React from "react";
import  {useMsal}  from "@azure/msal-react";
import  { loginRequest } from "../../authConfig";
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
    return (
        
        <div className="form-class" >
          <button type="button" className="btn btn-primary" onClick={()=> handleLogin("popup")}>SignIn</button>
        </div>
    );
}