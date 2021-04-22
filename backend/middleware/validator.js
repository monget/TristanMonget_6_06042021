const { check, validationResult } = require('express-validator');

exports.signup = [
    check('email')
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
    check('password')
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
    check('email')
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

exports.createSauce = [
    check('name').trim().escape(),
    check('manufacturer').trim().escape(),
    check('description').trim().escape(),
    check('mainPepper').trim().escape(),
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

exports.modifySauce = [
    check('name').trim().escape(),
    check('manufacturer').trim().escape(),
    check('description').trim().escape(),
    check('mainPepper').trim().escape(),
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
