const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const validator = require('../middleware/validator');
const accountLimit = require('../middleware/accountLimiter');

router.post('/signup', accountLimit, validator.signup, userCtrl.signup);
router.post('/login', accountLimit, validator.login, userCtrl.login);

module.exports = router;