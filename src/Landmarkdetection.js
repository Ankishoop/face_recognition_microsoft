import React, { useEffect, useRef } from 'react'
import * as facemesh from "@tensorflow-models/facemesh";
import { drawmesh } from "./utilities";
import Webcam from 'react-webcam';
function Landmarkdetection() {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);


    const loading_landmark = async () => {
        console.log("finding");
        const net = await facemesh.load({
          detectionConfidence: 0.5,
          inputResolution: {
            width: 640,
            height: 480,
          },
          scale: 0.8,
        });
        setInterval(() => {
          detect(net);
        }, 125);
      };


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

          canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;


        const face = await model.estimateFaces(video);
        console.log(face);
        const ctx = canvasRef.current.getContext("2d");
        drawmesh(face, ctx);
        }
    }

    useEffect(() => {
      loading_landmark();
    }, [])
    
  return (
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

export default Landmarkdetection