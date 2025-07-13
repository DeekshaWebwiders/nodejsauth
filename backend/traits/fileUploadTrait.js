const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/profile_pictures';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Accept all image types
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

function handleMulterUpload(req) {
  return new Promise((resolve, reject) => {
    upload.single('profile_picture')(req, {}, err => {
      if (err) return reject(err);

      if (req.file) {
        req.body.profile_picture = `uploads/profile_pictures/${req.file.filename}`;
      }
      resolve();
    });
  });
}

module.exports = { handleMulterUpload };
