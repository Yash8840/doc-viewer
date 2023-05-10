
import { useContext, useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import Viewer from "../PDFviewer";
import Header from "./Header";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import AuthContext from "./context/AuthContext";
import GoogleButton from "./GoogleButton";

// const CLIENT_ID =
//   "205989919059-bh97libljd5b3e7bb28kt7o9oklk9nki.apps.googleusercontent.com"
// const SCOPES =
//   "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata.readonly";



// const loadScript = (src) =>
//   new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${src}"]`)) return resolve();
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve();
//     script.onerror = (err) => reject(err);
//     document.body.appendChild(script);
//   });

// const Login = () => {
//   console.log('Login is Running...');

//   const navigate = useNavigate();
//   const [user, setUser] = useState();
//   const [tokenClient, setTokenClient] = useState();
//   const googleButton = useRef(null);
//   const [driveData , setDriveData] = useState();
//   const [token , setAccessToken] = useState();

//   useEffect(() => {
//     const src = "https://accounts.google.com/gsi/client";
//     const id = CLIENT_ID;

//     loadScript(src)
//       .then(() => {
//         /*global google*/
//         console.log(google);
//         google.accounts.id.initialize({
//           client_id: id,
//           callback: handleCredentialResponse,
//         });
//         google.accounts.id.renderButton(googleButton.current, {
//           theme: "outline",
//           size: "large",
//         });
//         //for getting unique access token of user
//         setTokenClient(
//           google.accounts.oauth2.initTokenClient({
//             client_id: CLIENT_ID,
//             scope: SCOPES,
//             callback: (tokenResponse) => {
//               console.log(tokenResponse);
//               setAccessToken(tokenResponse.access_token)
//               //We now have access to a live token to use for any google API
//               if (tokenResponse && tokenResponse.access_token) {
//                 fetch("https://www.googleapis.com/drive/v3/files?fields=*", {
//                   method: "GET",
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${tokenResponse.access_token}`,
//                   },
//                 })
//                   .then((response) => {
//                     return response.json();
//                   })
//                   .then((data) => {
//                     console.log(data);
//                     setDriveData(data);
                    
//                   });
//               }
//             },
//           })
//         );

//         google.accounts.id.prompt(); // the prompt that appear when we first open page to login
//         //this also has the same callback function as the sign-in button
//       })
//       .catch(console.error);

//     return () => {
//       const scriptTag = document.querySelector(`script[src="${src}"]`);
//       if (scriptTag) document.body.removeChild(scriptTag);
//     };
//   }, []);
//   if(driveData){console.log(driveData.files[0].webViewLink)}

  

//   function handleCredentialResponse(response) {
//     console.log("Encoded JWT ID token: " + response.credential);
//     var userObj = jwt_decode(response.credential);
//     console.log(userObj);
//     document.getElementById("signInDiv").hidden = true;
//     setUser(userObj);
    
//   }
//   const handleSignOut = (e) => {
//     document.getElementById("signInDiv").hidden = false;
//     setUser();
//   };
//   const openDrive = () => {
//     console.log('open drive function ran');
//     tokenClient.requestAccessToken();
//   };
  
  

  //If we have no user, we show sign-in button
  //if we have a user, we show log out button
  const Login = (props)=>{
    const[googleButton , setGoogleBtn] = useState()
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    console.log(authCtx);
    console.log(googleButton);
    if(authCtx.userData){
      navigate('home')
      authCtx.loginHandler();
      // document.getElementById("signInDiv").hidden = false;

    }







    
  
    
  return (
    <>    
    <div className="App">
      {/* <div id="signInDiv" ref={googleButton}></div> */}
      {/* {user && <button onClick={handleSignOut}>Sign Out</button>}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
      <button onClick={openDrive}>Open Drive</button> */}

      {/* <div className="pdf-Viewer">
        {driveData && <Viewer token={token} pdfFileLink={driveData.files[0].webContentLink}/>}
      </div> */}
     <div className="main">
       <img src="https://docsviewer.netlify.app/static/media/logo.97a85baf0c92b5345597.png" className="main-img"/>
       <div className="main-text"><span>Welcome 👋</span> <br/> Try Doc Viewer an easy way to view all your google Docs</div>
       <div id="signInDiv" ref={props.googleBtn}></div>
       {/* <GoogleButton/> */}
     </div>
    </div>
    </>
  );
};

export default Login;