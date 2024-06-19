import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

      const response = await axios.post('/process-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadStatus(response.data.message);
      setAudioSrc(response.data.audioSrc); // Assuming backend returns base64 audioSrc
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1>Upload an Audio File</h1>
      <Form>
        <Form.Group>
          <Form.Control
            id="audioFile"
            type= "file"
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
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </Container>
  );
};

export default App;
