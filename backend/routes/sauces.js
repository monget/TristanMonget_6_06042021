const express = require('express');
const router = express.Router();

const Sauce = require('../models/Sauce');
const sauceCrtl = require('../controllers/sauces');

router.post('/', sauceCrtl.createSauce); 
router.put('/:id', sauceCrtl.modifySauce);
router.delete('/:id', sauceCrtl.deleteSauce);
router.get('/:id', sauceCrtl.getOneSauce);
router.get('/', sauceCrtl.getAllSauces);

module.exports = router;