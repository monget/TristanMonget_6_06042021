const { check, validationResult } = require('express-validator');
const fs = require('fs');

exports.signup = [
    check('email')
    .isEmail()
    .normalizeEmail()
    .matches(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
    .withMessage("Merci de renseigner une adresse email valide !"),
        (req, res, next) => { // Contrôle de l'email
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
        (req, res, next) => { // Contrôle du password
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
        (req, res, next) => { // Contrôle de l'email
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
    check('name').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape("&#x27;"),
    check('manufacturer').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape("&#x27;"),
    check('description').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape("&#x27;"),
    check('mainPepper').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape("&#x27;"),
        (req, res, next) => {
            if (req.file != undefined) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.statusMessage = "Merci de renseigner tous les champs !";
                    res.status(400).end();
                }
                else if (req.file.filename == "error") {
                    fs.unlinkSync(`images/error`);
                    res.statusMessage = "Extensions image jpg, jpeg ou bmp seulement autorisées !";
                    res.status(400).end();
                }
                else {
                    next();
                }
            }
            else {
                res.statusMessage = "Merci d'ajouter une image !";
                res.status(400).end();
            }
        }
];

exports.modifySauce = [
    check('name').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape("&#x27;"),
    check('manufacturer').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape("&#x27;"),
    check('description').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape('&#x27;'),
    check('mainPepper').not().isEmpty().trim().blacklist(['$','<>','{}','/']).escape().unescape("&#x27;"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.statusMessage = "Merci de renseigner tous les champs !";
                res.status(400).end();
            }
            else {
                if (req.file == undefined) {
                    next();
                }
                else if (req.file.filename == "error") {
                    fs.unlinkSync(`images/error`);
                    res.statusMessage = "Extensions image jpg, jpeg ou png seulement autorisées !";
                    res.status(400).end();
                }
                else {
                    next();
                }
            }
        }
];