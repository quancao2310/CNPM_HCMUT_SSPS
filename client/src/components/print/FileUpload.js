import { useContext, useEffect, useState } from "react";
import fileupload_bg from "../../assets/img/fileupload_bg.jpg";

const bg = {
  backgroundImage: `url(${fileupload_bg})`,
  backgroundRepeat: "no-repeat",
  backgoundSize: "cover",
  height: "100vh",
};

function FileUploadMain() {
  return (
    <div className='container-fluid' style={bg}>
      <div
        className='container'
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.78)",
          borderRadius: "20px",
        }}
      >
        <div className='row'>
          <div
            className='col'
            style={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "48px",
              lineHeight: "58px",
              color: "#2C80B0",
              textAlign: "center",
            }}
          >
            Tải tài liệu
          </div>
          <div>
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
            Tải tài liệu bạn muốn in
          </div>
          <div>
            <div>
              Kéo thả tài liệu tại đây
              -- Hoặc --
            </div>
            <button>Chọn tài liệu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileUpload_files() {
  
}

function FileUpload() {
  return <FileUploadMain />;
}

export default FileUpload;