import React from "react";
import { useMsal }  from "@azure/msal-react";
import "./pageLayout.css";

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export default function SignOutButton() {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/" // redirects the top level app after logout
            });
        }
    }

    return (
        // <Button variant="secondary" className="ml-auto" onClick={() => handleLogout("popup")}>Sign out using Popup</Button>
        <div className="form-class">
        <button className="btn" onClick={()=> handleLogout("popup")}>SignOut</button>
        </div>
    );
}