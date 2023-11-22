import { useContext, useEffect, useState } from 'react';
import fileupload_bg from '../assets/img/fileupload_bg.jpg';
import upload_button from '../assets/img/upload_button.png';

const bg = {
    backgroundImage: `url(${fileupload_bg})`,
    backgroundRepeat: 'no-repeat',
    backgoundSize: 'cover',
    height: '100vh',
};

function FileUpload_main(){
    return (
        <div className = "container-fluid py-4" style={bg}>
            <div className = "container rounded-4 px-4 py-3" style = {{ 
                backgroundColor: 'rgba(255, 255, 255, 0.78)',
                width: '95%'
            }}>
                <div>
                    <div className = "text-center text-primary fw-bold fs-1" style = {{}}>
                        Tải tài liệu
                    </div>
                    <div className = "text-center fs-5">
                        Tải tài liệu bạn muốn in
                    </div>
                </div>
                <div className = "container rounded-4 bg-white m-2 p-3" style = {{ 
                    border: 'dashed 1px rgba(0, 0, 0, 1)',
                    width: '50%'
                 }}>
                    <img src={upload_button} className="d-block mx-auto"></img>
                    <div style = {{ textAlign: 'center' }}>
                        <p className = "fs-3">Kéo thả tài liệu tại đây</p>
                        <p className = "fs-3">-- Hoặc --</p>
                    </div>
                    <button className="btn btn-primary d-block mx-auto">Chọn tài liệu</button>
                </div>
            </div>
        </div>
    );
}

function FileUpload_files(){

}

function FileUpload(){
    return (
        <FileUpload_main />
    );
}

export default FileUpload;