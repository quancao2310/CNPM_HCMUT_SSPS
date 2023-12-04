const fs = require('fs');

let multer = require("multer");
let uploadPath;

let diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    // cho phép doc, docx, pdf, png, jpeg, ppt
    let allowedFileType = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/vnd.ms-powerpoint",
    ];
    if (allowedFileType.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. The file type is not allowed.`;
      return callback(errorMess, null);
    }
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

let uploadFile = multer({ storage: diskStorage }).single("file"); // file là tên của thẻ input khi truyền file

async function SaveTemporaryFile(req, res){
  const id = req.query.id;
  uploadPath=`temporary_files/${id}`
  uploadFile(req, res, (error) => {
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }
    const newPath = `${uploadPath}/${req.file.filename}`;
    fs.copyFileSync(req.file.path, newPath);
    return res.send(req.file);
  });
}

async function SavePrintFile(req, res){
  const id = req.query.id;
  uploadPath=`print_files/${id}`
  uploadFile(req, res, (error) => {
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }
    const newPath = `${uploadPath}/${req.file.filename}`;
    fs.copyFileSync(req.file.path, newPath);
    return res.send(req.file);
  });
}

module.exports = {SaveTemporaryFile,SavePrintFile};