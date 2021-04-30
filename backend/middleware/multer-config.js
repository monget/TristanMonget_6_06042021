const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // Destination du fichier
    callback(null, 'images');
  },
  filename: (req, file, callback) => { // Nom du fichier et contrôle de l'extension
    const originalName = file.originalname.split(' ').join('_');
    const name = originalName.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    var fileTypes = /jpeg|jpg|png/;
    var mimetype = fileTypes.test(file.mimetype);
    if (mimetype == true) {
      callback(null, name + Date.now() + '.' + extension);
    }
    else {
      callback(null, 'error')
    }
  }
});

module.exports = multer({storage: storage}).single('image');