const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        User.findOne({ _id: userId })
            .then(user => {
                if (!user) {
                    throw 'User ID non valable';
                }
                else {
                    next();
                }
            })
            .catch(error => res.status(401).json({ error }))
    }
    catch (error) {
        res.status(401).json({ error: 'Requête non authentifié !' })
    }
}
