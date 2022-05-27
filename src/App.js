import React from 'react';
import { BrowserRouter , Route, Link,  Routes } from 'react-router-dom';
import './App.css'
import Facedetection from './Facedetection'
import Home from './Home';
import Landmarkdetection from './Landmarkdetection';
import Objectdetection from './Objectdetection';
import Handpose from './Handpose';


function App() {
  return (
<>
    <BrowserRouter>
      <div className='App_Main_Container'>
        
        <Link to="/"style={{width:140}} ><span> Home</span> </Link>
        <Link to="/facedetection" style={{width:160}}><span> Face Detection</span> </Link>
        <Link to="/landmarkdetection" style={{width:215}}><span>  Landmark Detection</span> </Link>
        <Link to="/objectdetection" style={{width:210}}><span> Object Detection</span> </Link>
        <Link to="/handdetection" style={{width:215}}><span>  hand landmarks</span> </Link>
    
      </div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/facedetection" element={(<Facedetection/>)}/>
        <Route exact path="/landmarkdetection" element={<Landmarkdetection/>}/>
        <Route exact path="/objectdetection" element={<Objectdetection/>}/>
        <Route exact path="/handdetection" element={<Handpose/>}/>
        
      </Routes>
    </BrowserRouter>

  
</>
  )
}

export default App;
