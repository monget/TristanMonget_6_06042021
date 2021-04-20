const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const validator = require('../middleware/validator');

router.post('/signup', validator.signup, userCtrl.signup);
router.post('/login', validator.login, userCtrl.login);

module.exports = router;