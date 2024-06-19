import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { writeFileSync } from 'fs';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('audio', selectedFile);

      const response = await axios.post('http://localhost:3000/search', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      console.log(response.data)
      console.log(response.data.data.Get.AudioTable[0].audio);
      const base64Audio = response.data.data.Get.AudioTable[0].audio;
      const audioBlob = new Blob([Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);

      setUploadStatus('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Container>
      <h1>Upload an Audio File</h1>
      <Form>
        <Form.Group>
          <Form.Control
            id="audioFile"
            type="file"
            onChange={handleFileChange}
            accept=".mp3,.wav,.ogg"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload} disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Upload Audio'}
        </Button>
      </Form>
      {uploadStatus && <p>{uploadStatus}</p>}
      {audioSrc && (
        <>
          <audio ref={audioRef}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <Button variant="secondary" onClick={handlePlay}>
            Play Audio
          </Button>
        </>
      )}
    </Container>
  );
};

export default App;
