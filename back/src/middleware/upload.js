const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require("../utils/cloudinary");

  
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'catalogo_aleg', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
       public_id: (req, file) => {
      return `imagen_${Date.now()}`;
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
