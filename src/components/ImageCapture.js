import React, { useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
}

const ImageCapture = () => {
  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    console.log(pictureSrc);
    setPicture(pictureSrc)
  })
  return (
    <>
    <div>
      <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Examle
      </h2>
    <div>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={480}
            ref={webcamRef}
            width={640}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}

            className="mb-5 text-center"
          />
        ) : (
          <img src={picture} className="mb-1 text-center"/>
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture(false)
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
    </>
  )
}
export default ImageCapture;