import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { IoDocumentTextOutline, IoPrintOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypePptx } from "react-icons/bs";
import '../../assets/styles/FileUpload.css'
import fileupload_bg from '../../assets/img/fileupload_bg.jpg';
import upload_button from '../../assets/img/upload_button.png';


function FileUpload(){

    

    const bg = {
        backgroundImage: `url(${fileupload_bg})`,
        height: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    };

    const [files, setFiles] = useState([]);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const handleFileUpload = (event) => {
        // const formData = new FormData();
      
        // for (let i = 0; i < event.target.files.length; i++) {
        const newFile = event.target.files[0];
        setFiles([...files, newFile]);
            // formData.append('files', newFile);
      
            // try {
            //     const response = await axios.post(`http://localhost:8080/upload`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //         onUploadProgress: (progressEvent) => {
            //             const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            //             console.log('File Upload Progress:', percentage);
            //         },
            //     });
            //     console.log('File Uploaded:', response.data);
            //     setFiles([...files, newFile]);
            // } 
            // catch (error) {
            //     console.error('Error uploading file:', error);
            // }
        // }   
    };

    const handleFileIcon = (name) => {
        let index = name.length - 1;
        while (index >= 0 && name[index] !== '.') index--;
        const type = name.slice(index+1);
        switch(type){
            case 'doc':
            case 'docx':
                return <IoDocumentTextOutline />;
            case 'pdf':
                return <FaRegFilePdf />
            case 'ppt':
            case 'pptx':
                return <BsFiletypePptx />
        }
    }

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
                        <div className="text-center" style={{ height: '85%' }}>
                            <img
                                src={upload_button} 
                                className="d-block mx-auto" 
                                alt="Upload Logo" 
                                id = "upload-logo"
                            />
                            <div className="text">Kéo thả tài liệu tại đây</div>
                            <div className="text">-- Hoặc --</div>
                            <input
                                id = "fileInput"
                                type = "file"
                                // multiple = "multiple"
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
                        <ul 
                            className="list-group rounded-0"
                            id = "list-files"
                        >
                            {files.map((file, index) => (
                                <li 
                                    className="list-group-item mb-3 mx-1" 
                                    key={index}
                                > 
                                    <div className="d-flex row">
                                        <div className="col-1">
                                            {handleFileIcon(file.name)}
                                        </div>
                                        <div 
                                            className="col-6 col-sm-8 col-md-9 col-lg-10 text-3 py-1"
                                            style = {{
                                                overflowWrap: 'break-word',
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            {file.name} - ({uploadPercentage}%)
                                        </div>
                                        <Link className="col-1" to='/print/config' state = {{name: file.name}}>
                                            <IoPrintOutline />
                                        </Link>
                                    </div>
                                    <div className="progress bg-dark" style = {{ height: '2px'}}>
                                        <div
                                            className="progress-bar bg-success"
                                            role="progressbar"
                                            aria-valuenow={uploadPercentage}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                                width: `${uploadPercentage}%` 
                                            }}
                                        >
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;