import { useState, useEffect } from 'react';
import axios from 'react';
import ProgressiveImage from "react-progressive-graceful-image";
import upload_button from '../../assets/img/upload_button.png';

function UploadArea({ onUpload }){

    const url = `${process.env.REACT_APP_SERVER_URL}/print/uploadTemporaryFile?id=0`;

    const uploadFiles = async (file) => {
        const formData = new FormData();
    
        formData.append('file', file);
     
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('File upload response:', data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    };
    

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files[0];
        uploadFiles(droppedFiles);
    };
    
    const handleFileUpload = (event) => {
        event.preventDefault();
        const uploadedFiles = event.target.files[0];
        uploadFiles(uploadedFiles);
    };
    
    
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div 
            className="col-5 d-flex justify-content-center bg-white rounded-4 p-2" 
            style={{ 
                border: 'dashed 1px rgba(0, 0, 0, 1)',
                width: '50%', height:'100%' 
            }}
        >
            <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="text-center" 
                style={{ height: '85%' }}
            >
                <ProgressiveImage src={upload_button}>
                    {(src, loading) => (
                    <img
                        src={src} 
                        className={`d-block mx-auto image${loading ? " loading" : " loaded"}`}
                        alt="Upload Logo" 
                        id = "upload-logo"
                        draggable="false"
                    />)}
                </ProgressiveImage>
                <div className="text">Kéo thả tài liệu tại đây</div>
                <div className="text">-- Hoặc --</div>
                <input
                    id = "fileInput"
                    name="file" type = "file"
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload}
                />
                <button className="btn text-white fw-medium" id = "button" onClick={() => document.getElementById('fileInput').click()}>
                    Chọn tài liệu
                </button>
            </div>
        </div>
    );
}

export default UploadArea;