import { useState } from 'react';
import '../../assets/styles/FileUpload.css'
import fileupload_bg from '../../assets/img/fileupload_bg.jpg';
import upload_button from '../../assets/img/upload_button.png';

const bg = {
    backgroundImage: `url(${fileupload_bg})`,
    height: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
};



function FileUpload(){
    const [files, setFiles] = useState([]);

    const handleFileUpload = (event) => {
        const newFile = event.target.files[0];
        if (newFile != null) setFiles([...files, newFile]);
    };

    return (
        <div 
            className = "position-relative" 
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
                <div className = "text-center">
                    <div className = "big-text text-primary fw-bold" style = {{
            
                    }}>
                        Tải tài liệu
                    </div>
                    <div className = "text m-2">
                        Tải tài liệu bạn muốn in
                    </div>
                </div>
                <div 
                    className = "row d-flex justify-content-center" 
                    style = {{
                        height: '70%'
                    }}
                >
                    <div 
                        className="col-6 d-flex justify-content-center align-items-center rounded-4 bg-white py-1" 
                        style={{ 
                            border: 'dashed 1px rgba(0, 0, 0, 1)',
                            width: '50%' 
                        }}
                    >
                        <div className="text-center p-bottom-2" style={{ height: '85%'}}>
                            <img
                                src={upload_button} 
                                className="d-block mx-auto" 
                                alt="Upload Logo" 
                                id = "upload-logo"
                            />
                            <div className="text m-1" style={{ height:'10%' }}>Kéo thả tài liệu tại đây</div>
                            <div className="text m-1" style={{ height:'10%' }}>-- Hoặc --</div>
                            <input
                                id = "fileInput"
                                type = "file"
                                multiple = "multiple"
                                style={{ display: 'none' }} 
                                onChange={handleFileUpload}
                            />
                            <button className="btn btn-primary" onClick={() => document.getElementById('fileInput').click()}>
                                Chọn tài liệu
                            </button>
                        </div>
                    </div>
                    
                    {
                        files.length > 0 && (
                            <div className="container col-5" id="list-files">
                            <ul>
                                {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                            </div>
                        )
                    }
                    
                    
                </div>
            </div>
        </div>
    );
}

export default FileUpload;