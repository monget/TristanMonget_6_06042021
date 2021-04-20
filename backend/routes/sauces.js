const express = require('express');
const router = express.Router();

const sauceCrtl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const validator = require('../middleware/validator');

router.post('/', auth, validator.sauce, multer, sauceCrtl.createSauce);
router.put('/:id', auth, validator.sauce, multer, sauceCrtl.modifySauce);
router.delete('/:id', auth, sauceCrtl.deleteSauce);
router.get('/:id', auth, sauceCrtl.getOneSauce);
router.get('/', auth, sauceCrtl.getAllSauces);
router.post('/:id/like', auth, sauceCrtl.likeSauce);

module.exports = router;