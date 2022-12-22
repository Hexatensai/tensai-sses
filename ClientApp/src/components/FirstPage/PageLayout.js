import React from "react";
import "./pageLayout.css";
import  { useIsAuthenticated } from "@azure/msal-react";
import  SignOutButton  from "./signOutButton";
import  SignInButton  from "./signInButton";

export default function PageLayout(props) {
    const isAuthenticated = useIsAuthenticated();
    return (
        <>
                { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
            <br />
            <br />
            {props.children}
        </>
    );
};