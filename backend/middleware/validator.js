const { body, validationResult } = require('express-validator');

exports.signup = [
    body('email')
    .isEmail()
    .normalizeEmail()
    .matches(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
    .withMessage("Merci de renseigner une adresse email valide !"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.statusMessage = errors.array().map(err => err.msg );
                res.status(400).end();
            }
            else {
                next();
            }
        },
    body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-zÀ-ÖØ-öø-ÿ\d@$!%*?&\s_-]{8,}$/)
    .withMessage("Le mot de passe doit contenir au minimun 8 caractères dont un chiffre, une lettre majuscule et une minuscule."),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.statusMessage = errors.array().map(err => err.msg );
                res.status(400).end();
            }
            else {
                next();
            }
        }
];

exports.login = [
    body('email')
    .matches(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
    .withMessage("Merci de renseigner une adresse email valide !"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.statusMessage = errors.array().map(err => err.msg );
                res.status(400).end();
            }
            else {
                next();
            }
        }
];

exports.sauce = [
    body('name').trim().escape(),
    body('manufacturer').trim().escape(),
    body('description').trim().escape(),
    body('mainPepper').trim().escape(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.statusMessage = "Merci de renseigner tous les champs !";
                res.status(400).end();
            }
            else {
                next();
            }
        }
];