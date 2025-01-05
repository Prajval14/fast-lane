const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("Setting destination for file:", file.originalname);
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    const newFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log("Generating filename:", newFilename);
    cb(null, newFilename);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  console.log("Checking file type:", file.originalname);
  console.log("Extension name passed:", extname);
  console.log("MIME type passed:", mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    console.log("Invalid file type:", file.originalname);
    cb(new Error('Error: Only Images are Allowed!'));
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 4);

module.exports = upload;