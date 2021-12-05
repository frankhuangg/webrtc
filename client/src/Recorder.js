import React, { useRef, useEffect } from 'react';
import { useReactMediaRecorder, ReactMediaRecorder } from 'react-media-recorder';
// import {HTMLVideoElement} from 'react-media-recorder'
 
export default function Recorder() {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true, type: 'video/mp4' });
 
  const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
    const videoRef = useRef(null);
 
    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);
    if (!stream) {
      return null;
    }
    return <video ref={videoRef} width={500} height={500} autoPlay controls />;
  };
 
  const showFile = async (bloburl, documentName) => {
    const videoBlob = await fetch(bloburl).then((r) => r.blob());
    console.log(videoBlob);
 
    const newBlob = new Blob([videoBlob], { type: 'video/mp4' });
 
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
 
    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = data;
    link.download = documentName;
    link.click();
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    }, 100);
  };
  useEffect(() => {
    console.log('cd');
    console.log(mediaBlobUrl);
    if (mediaBlobUrl) {
      showFile(mediaBlobUrl, 'test');
    }
  }, [stopRecording]);
  /*
   const formData = new FormData();
 
            formData.append("file", audiofile);
 
            const result = await axios.post(
                `<your server post end point>`,
                formData,
                {
                    crossDomain: true,
                }
            )
  */
 
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <p>{status}</p>
        <button type="button" onClick={startRecording}>Start Recording</button>
        <button type="button" onClick={stopRecording}>Stop Recording</button>
        <video src={mediaBlobUrl} controls autoPlay loop />
      </div>
 
      <ReactMediaRecorder
        video
        render={({ previewStream }) => (
          <VideoPreview stream={previewStream} />
        )}
      />
    </div>
  );
}
 

