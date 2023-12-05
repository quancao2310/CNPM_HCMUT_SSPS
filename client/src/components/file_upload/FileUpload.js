import { useEffect, useState } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import '../../assets/styles/FileUpload.css';
import fileupload_bg from '../../assets/img/fileupload_bg.jpg';
import FileCards from './FileCard';
import UploadArea from './UploadArea';

function FileUpload({ id }) {
    const bg = {
        backgroundImage: `url(${fileupload_bg})`,
        height: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    };

    const [length, setLength ] = useState(0);
    const [files, setFiles] = useState(["text.txt"]);

    useEffect(() => {
        const storedFiles = localStorage.getItem("files");
        if (storedFiles) {
            setFiles(JSON.parse(storedFiles));
            setLength(JSON.parse(storedFiles).length);
        }
    }, [length]);

    return (
        <div 
            className="position-relative mx-auto" 
            style={bg} 
            id="file-upload"
        >
            <ProgressiveImage src={fileupload_bg}>
                {(src, loading) => (
                <img
                    className={`image${loading ? " loading" : " loaded"}`}
                    src={src}
                    alt='File Upload Background'
                    style={{
                        width: "100%",
                        objectFit: "contain",
                        visibility: "hidden",
                    }}
                    draggable="false"
                />)}
            </ProgressiveImage>
            <div 
                className="container-fluid position-absolute top-0 rounded-4" 
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.78)',
                    width: '80%', height: '80%',
                    margin: '5% 10%',
                    padding: '2% 0%',
                }}
            >
                <div className="row d-flex justify-content-center">
                    <div className={`col-6 ${files.length === 0 ? 'text-center' : ''}`}>
                        <div className="big-text fw-bold">
                            Tải tài liệu
                        </div>
                        <div className="text my-2">
                            Tải tài liệu bạn muốn in
                        </div>
                    </div>
                    {files.length !== 0 ? <div className="col-5"></div>:''}
                </div>
                <div 
                    className="row d-flex justify-content-center" 
                    style={{ height: '70%' }}
                >
                    <UploadArea id={id} length={length} setLength = {setLength} />
                    <div 
                        className={`col-5 ${files.length === 0 ? 'd-none': ''}`} 
                        id="list-files"
                        style={{ 
                            width: '40%', maxWidth: '40%',
                            padding: '0% 2%'
                        }}
                    >
                        <div className="text-2 fw-bold">
                            Tài liệu đã tải
                        </div>
                        <FileCards files={files} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;