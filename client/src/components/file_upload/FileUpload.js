import { useContext, useState } from 'react';

import '../../assets/styles/FileUpload.css'
import fileupload_bg from '../../assets/img/fileupload_bg.jpg';
import upload_button from '../../assets/img/upload_button.png';
import FileCards from './FileCard';


function FileUpload(){

    const bg = {
        backgroundImage: `url(${fileupload_bg})`,
        height: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    };

    const [files, setFiles] = useState([]);

    const [uploadPercentage, setUploadPercentage] = useState(0);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);
    };
        
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    
    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setFiles([...files, ...uploadedFiles]); 
    };

    

    return (
        <div 
            className="position-relative mx-auto" 
            style={bg} 
            id = "file-upload"
        >
            <img
                src={fileupload_bg}
                alt='File Upload Background'
                style={{
                    width: "100%",
                    objectFit: "contain",
                    visibility: "hidden",
                }}
                draggable="false"
            />
            <div 
                className = "container-fluid position-absolute top-0 rounded-4" 
                style = {{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.78)',
                    width: '80%', height: '80%',
                    margin: '5% 10%',
                    padding: '2% 0%'
                }}
            >
                <div class = "row d-flex justify-content-center">
                    <div className={`col-6 ${files.length === 0 ? 'text-center' : ''}`}>
                        <div className = "big-text fw-bold">
                            Tải tài liệu
                        </div>
                        <div className = "text my-2">
                            Tải tài liệu bạn muốn in
                        </div>
                    </div>
                    {
                        files.length > 0 && (
                            <div className="col-5"></div>
                        )
                    }
                </div>
                <div 
                    className = "row d-flex justify-content-center" 
                    style = {{ height: '70%' }}
                >
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
                            <img
                                src={upload_button} 
                                className="d-block mx-auto" 
                                alt="Upload Logo" 
                                id = "upload-logo"
                                draggable="false"
                            />
                            <div className="text">Kéo thả tài liệu tại đây</div>
                            <div className="text">-- Hoặc --</div>
                            <input
                                id = "fileInput"
                                type = "file"
                                multiple = "multiple"
                                style={{ display: 'none' }} 
                                onChange={handleFileUpload}
                            />
                            <button className="btn text-white fw-medium" id = "button" onClick={() => document.getElementById('fileInput').click()}>
                                Chọn tài liệu
                            </button>
                        </div>
                    </div>
                    <div 
                        className={`col-5 ${files.length > 0 ? '' : 'd-none'}`} 
                        id="list-files"
                        style = {{ 
                            width: '40%', maxWidth: '40%',
                            padding: '0% 2%'
                        }}
                    >
                        <div className="text-2 fw-bold">
                            Tài liệu đã tải
                        </div>
                        <FileCards files={files} uploadPercentage={uploadPercentage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;