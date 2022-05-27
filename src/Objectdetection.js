import React, { useEffect, useRef } from "react";
import * as tf from '@tensorflow/tfjs'
import Webcam from "react-webcam";
import * as cocossd from '@tensorflow-models/coco-ssd'
import { drawobject } from "./utilities";

function Objectdetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const objectdetection=async()=>
  {
      //loading network
    const net = await cocossd.load();

    setInterval(()=>
    {
        detect(net)
    },10)
  }

  const detect = async (model) => {
    //webcam is open or not
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Set canvas height and width

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections from webcam

      const obj = await model.detect(video);
        console.log(obj);
      //object detction is done here

      const ctx = canvasRef.current.getContext("2d");
      drawobject(obj,ctx);
    }
  };
  useEffect(() => {
    objectdetection();
    
  }, [])
  

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "centr",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "centr",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </>
  );
}

export default Objectdetection;
