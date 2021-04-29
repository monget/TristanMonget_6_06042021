const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
require('dotenv').config()

const User = require('../models/User');


exports.signup = (req, res, next) => {
    User.find()
        .then(users => {
            const data = []
            for (const [key, value] of Object.entries(users)) {
                const bytes  = CryptoJS.AES.decrypt(`${value.email}`, process.env.SECRET_KEY);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                const user = {
                    id: `${value._id}`,
                    email: originalText
                }
                data.push(user)
            }
            const email = data.find(el => el.email == req.body.email);
            if (email == undefined) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const data = req.body.email;
                        const cryptEmail = CryptoJS.AES.encrypt(data, process.env.SECRET_KEY).toString();
                        const user = new User({
                            email: cryptEmail,
                            password: hash
                        });
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                            .catch(error => res.status(400).json({ error }))
                    })
                    .catch(error => res.status(500).json({ error }));
            }
            else {
                return res.status(401).json({ error: 'Utilisateur déjà existant !' })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.find()
        .then(users => {
            const data = []
            for (const [key, value] of Object.entries(users)) {
                const bytes  = CryptoJS.AES.decrypt(`${value.email}`, process.env.SECRET_KEY);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                const user = {
                    id: `${value._id}`,
                    email: originalText
                }
                data.push(user)
            }
            const email = data.find(el => el.email == req.body.email);
            if (email != undefined) {
                User.findOne({ _id: email.id })
                    .then(user => {
                        bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe incorrect !' })
                            }
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id},
                                    process.env.JWT_SECRET,
                                    { expiresIn: process.env.JWT_EXPIRES_IN }
                                ),
                            })
                        })
                        .catch(error => res.status(500).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }
            else {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
        })
        .catch(error => res.status(500).json({ error }));
};