import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Error from "./components/Error";
import Login from "./components/Login";
import Home from "./components/Home";
import AuthContext from "./components/context/AuthContext";
import jwt_decode from "jwt-decode";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     errorElement: <Error />,
//     children: [
//       { path: "", element: <Login/> },
//       { path: "home", element: <Home /> },
//     ],
//   },
// ]);

function App() {
  const [user, setUser] = useState();
  const [tokenClient, setTokenClient] = useState();
  const googleButton = useRef(null);
  const [driveData , setDriveData] = useState();
  const [token , setAccessToken] = useState();
  const[isLoggedIn , setIsLoggedIn] = useState(false);
  console.log(googleButton);

  const loginHandler=()=>{
    setIsLoggedIn(true);
  }
  const logoutHandler = ()=>{
    setIsLoggedIn(false)
  }
  console.log("App is running");
  const CLIENT_ID =
  "331752740873-8img4rhj28j3j3e0nh9v48n6qupfs7j3.apps.googleusercontent.com"
const SCOPES =
  "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata.readonly";



const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });



 
  
  // if(googleButton.current){
  //   console.log('werds');
  // }
  

  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    const id = CLIENT_ID;

    loadScript(src)
      .then(() => {
        /*global google*/
        console.log(google);
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
        });
        //for getting unique access token of user
        setTokenClient(
          google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: (tokenResponse) => {
              console.log(tokenResponse);
              setAccessToken(tokenResponse.access_token)
              //We now have access to a live token to use for any google API
              if (tokenResponse && tokenResponse.access_token) {
                fetch("https://www.googleapis.com/drive/v3/files?fields=*", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                  },
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    console.log(data);
                    setDriveData(data);
                    
                  });
              }
            },
          })
        );

        // google.accounts.id.prompt(); // the prompt that appear when we first open page to login
        //this also has the same callback function as the sign-in button
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, [isLoggedIn]);
  if(driveData){
    // console.log(driveData.files[0].webViewLink)
    console.log(driveData);
  }

  

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObj = jwt_decode(response.credential);
    console.log(userObj);
    // document.getElementById("signInDiv").hidden = true;
    setUser(userObj);
  }
  const handleSignOut = (e) => {
    // document.getElementById("signInDiv").hidden = false;
    setUser();
    setIsLoggedIn(false);
    
  };
  const openDrive = () => {
    console.log('open drive function ran');
    tokenClient.requestAccessToken();
  };
  
  
  

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          loginHandler: loginHandler,
          logoutHandler: handleSignOut,
          userData: user,
          openDriveHandler: openDrive,
          driveData: driveData,
        }}>
        <BrowserRouter>
        <Routes>
          <Route path='' element={<Login googleBtn={googleButton}/>}/>
          <Route path='home' element={<Home handleSignOut={handleSignOut}/>}/>
        </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
