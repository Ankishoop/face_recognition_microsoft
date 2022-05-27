import React, { useEffect } from 'react'
import Webcam from 'react-webcam';
import { useRef } from 'react';
import * as tf from "@tensorflow/tfjs";
import detectanddraw from './utilities';

function Facedetection() {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const blazeface = require("@tensorflow-models/blazeface");


    const facedetection = async () => {
        console.log("start");
        const model = await blazeface.load();
        console.log("FaceDetection Model is Loaded..");
        setInterval(() => {
           detect(model);
        }, 100);
      };

      const returnTensors = false;


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
    
          // Make detections
    
          //face detction is done here

            const prediction = await model.estimateFaces(video, returnTensors);
            console.log(prediction);
            const ctx = canvasRef.current.getContext("2d");
            detectanddraw(prediction, ctx);  
    
          }
        };
        useEffect(() => {
          
          facedetection();
          
        }, [])
    
  return(
      <>
      
    <Webcam
          ref={webcamRef}
          // mirrored
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
  )
}

export default Facedetection