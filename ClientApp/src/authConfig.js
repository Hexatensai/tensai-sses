export const msalConfig = {
    auth: {
        clientId: "f1d90bba-d12d-4920-8f6a-708ea75ff61c",
        authority: "https://login.microsoftonline.com/7c0c36f5-af83-4c24-8844-9962e0163719", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
          // authority: "https://login.microsoftonline.com",
        redirectUri: "https://localhost:44406/projects",
      },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};
