const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../front/public/asset/img')); // ajustá la ruta si es necesario
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = req.body.nombre?.replace(/\s+/g, '_').toLowerCase() || 'imagen';
    const uniqueSuffix = Date.now();
    cb(null, `${baseName}_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
