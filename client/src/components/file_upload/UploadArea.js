function UploadArea(){

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
    );
}