import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './context/AuthContext'
import Header from './Header'
import './Home.css'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = (props) => {
  let docNames = [];
  const [name , setName] = useState('')
  const [content , setContent] = useState();
  const [click , setClickState] = useState(false);
  const [doc , setDoc] = useState('');

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(authCtx);
  
  const handleSignOutHandler = (e)=>{
    e.preventDefault();
    props.handleSignOut();
    props.handleSignOut();
    navigate('/');
  }
  let counter = false
  if(authCtx.driveData){
    counter=true;
  }
  
  useEffect(()=>{
    if(authCtx.driveData){
      console.log(authCtx.driveData.files);
      authCtx.driveData.files.forEach((file)=>{
        if(file.mimeType === 'application/vnd.google-apps.document'){
          docNames.push({
            name: file.name,
            link: file.webViewLink
          })
        }
      })
      console.log(docNames);
      setContent(docNames.map((item)=>{
        return <li key={item.link} onClick={clickHandler.bind(null, item.link)}>{item.name}</li>
      }))
      setName(docNames);
    }
  },[counter])

  const clickHandler = (link)=>{
     setClickState(true);
     setDoc(link)
  }
  
  
  return (
    <>
    {/* <Header handleSignOut = {props.handleSignOut}/>
    <div>
      {authCtx.userData && <p>Hello {authCtx.userData.name}</p>}
      {!authCtx.userData && <p>Please Login again.</p>}
    </div>
    <button onClick={()=>{authCtx.openDriveHandler()}}>Open drive</button> */}
<nav className="navbar">
  <div className="navbar-logo">
    {authCtx.userData && <img src={authCtx.userData.picture} />}
    {authCtx.userData && <span>Hello {authCtx.userData.name}</span>}
      {!authCtx.userData && <span>Please Login again.</span>}
  </div>
  <div className="navbar-links">
    <ul>
      <li><button onClick={()=>{authCtx.openDriveHandler()}}>Open drive</button></li>
      <li><a href="" onClick={handleSignOutHandler}>Logout</a></li>
    </ul>
  </div>
  <div className="navbar-toggle">
    <span className="toggle-icon"></span>
  </div>
</nav>
<div className="dashboard">
  <div className="sidebar">
    <h2>Documents</h2>
    <ul>
      {content}
    </ul>
  </div>
  <div className="main-content">
    <div className="document-container">
      {!click && <div className="loader"></div>}
      <div className="iframe-wrapper">
  <iframe src={doc} frameBorder="0" width="100%" height="100%"></iframe>
</div>
    </div>
  </div>
</div>
<div className="overlay"></div>
    </>
  )
}

export default Home