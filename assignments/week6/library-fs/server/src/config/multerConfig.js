
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuid } = require('uuid');


const rootDir = path.resolve(__dirname, '..'); 
const avatarsDir = path.join(rootDir, 'uploads', 'avatars');
const filesDir = path.join(rootDir, 'uploads', 'files');


[avatarsDir, filesDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});



const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, avatarsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    cb(null, `${uuid()}${ext}`);
  },
});


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, filesDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
});

const fileUpload = multer({
  storage: fileStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

module.exports = { avatarUpload, fileUpload };
