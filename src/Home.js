import React from 'react';
import Typewriter from 'typewriter-effect';
import './Home.css'

function Home() {
  return (
    <div className='home_main_container'>
      <span className='home_heading'>Detect </span>
      <Typewriter
      onInit={(typewriter)=>{

        typewriter.typeString("Face")
        .pauseFor(1000)
        .deleteChars(4)
        typewriter.typeString("Landmark")
        .pauseFor(1000)
        .deleteChars(8)
        typewriter.typeString("Object")
        .pauseFor(1000)
        .deleteChars(6)
        typewriter.typeString("Handpose")
        .pauseFor(1000)
        .deleteChars(8)
        .start()
      }}
      options={{
        
        autoStart:true,
        loop: true,
      }}
      />
    </div>
  )
}

export default Home