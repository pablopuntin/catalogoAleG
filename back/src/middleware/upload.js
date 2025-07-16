const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'catalogo_aleg', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => {
      const nombre = file.originalname.split('.')[0];
      return `${nombre}_${Date.now()}`; // ejemplo: "remera_123456789"
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
