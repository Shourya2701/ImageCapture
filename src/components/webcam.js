import React, { useRef, useEffect, useState } from 'react';

const Webcam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startWebcam = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStream(stream);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopWebcam = () => {
    if (videoRef.current) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        console.log(imageData);
        let pixelArray = [];
        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            pixelArray.push([r, g, b]);
        }
        console.log(pixelArray);
    }
  };

  const videoContainer =  {
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
  }
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col'>
                <video ref={videoRef} autoPlay muted className={videoContainer} style={{display:'none'}}/>
            </div>
            <div className='col'>
                <canvas ref={canvasRef} width={640} height={480} style={{display:'none'}} />
            </div>
        </div>
        <div className='pt-2 text-center'>
            {stream ? (
                <button onClick={stopWebcam}>Stop Webcam</button>
            ) : (
                <button onClick={startWebcam}>Start Webcam</button>
            )}
            {stream && (
                <button onClick={captureImage}>Capture Image</button>
            )}
        </div>
    </div>
  );
};

export default Webcam;
