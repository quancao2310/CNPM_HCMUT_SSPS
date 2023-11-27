import React, { useState } from 'react';
import axios from 'axios';

function ProgressBar(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadPercentage(percentage);
            },
            });

            console.log('File Uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
    <div>
        <h1>File Upload</h1>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload</button>

        {uploadPercentage > 0 && (
        <div>
            <p>Uploading: {uploadPercentage}%</p>
            <progress value={uploadPercentage} max="100" />
        </div>
        )}
    </div>
    );
};

export default ProgressBar;