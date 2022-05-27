import React, { useEffect, useRef } from "react";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawhand } from "./utilities";


function Handpose() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);



  const runHandpose = async () => {
    const net = await handpose.load();

    setInterval(() => {
      detect(net);
    }, 15);
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

      // set canvas properties
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //make detections
      const hand = await model.estimateHands(video);

      // console.log(hand);

      //draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawhand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

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
  );
}

export default Handpose;
