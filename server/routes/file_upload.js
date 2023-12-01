const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './upload',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
  
router.post('/upload', upload.array('files'), (req, res) => {
    console.log(req.files);
    res.json({ message: 'Files uploaded successfully!' });
});
  
module.exports = router;

