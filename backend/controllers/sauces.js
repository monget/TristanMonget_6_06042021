const Sauce = require('../models/Sauce');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createSauce = (req, res, next) => {
    let sauceObject = req.body;
    delete sauceObject._id;
    sauceObject.likes = 0;
    sauceObject.dislikes = 0;
    const sauce = new Sauce({
        ...sauceObject, // Opérateur spread extrait toutes les données de sauceObject pour les transmettre au nouveau schéma
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // Contrôle si req.file existe
    { 
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            if (userId == req.body.userId) {
                if (req.file != undefined) {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                            .catch(error => res.status(400).json({ error }));
                    })
                }
                else {
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                        .catch(error => res.status(400).json({ error }));
                }
            }
            else {
                return res.status(400).json({ error: "Opération interdite !" });
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            if (userId == sauce.userId) {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { // Supprime l'image du server puis les données de la sauce
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                })
            }
            else {
                return res.status(400).json({ error: "Opération interdite !" });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    counter = req.body.like;   
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (counter === 1) {
                Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 }})
                    .then(() => res.status(200).json({ message: 'J\'aime !'}))
                    .catch(error => res.status(400).json({ error }));
            }
            else if (counter === 0) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: {usersLiked: req.body.userId }, $inc: { likes: -1 }})
                        .then(() => res.status(200).json({ message: 'J\'aime annulé'}))
                        .catch(error => res.status(400).json({ error }));
                }
                else {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: {usersDisliked: req.body.userId }, $inc: { dislikes: -1 }})
                        .then(() => res.status(200).json({ message: 'Je n\'aime pas annulé'}))
                        .catch(error => res.status(400).json({ error }));
                }
            }
            else if (counter === -1) {
                Sauce.updateOne({ _id: req.params.id }, { $push: {usersDisliked: req.body.userId }, $inc: { dislikes: 1 }})
                    .then(() => res.status(200).json({ message: 'Je n\'aime pas !'}))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
};