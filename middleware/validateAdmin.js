const jwt = require('jsonwebtoken')
const User = require('../db').import('../models/userModel')

const validateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({auth: false, message: 'Invalid Credentials. Please sign in.'})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            if (!err && decodeToken) {
                User.findOne({
                    where: {
                        id: decodeToken.id,
                        role: decodeToken.role
                    }
                })
                .then(user => {
                    if (!user) throw err;
                    if (user.dataValues.role!=='admin') {
                        return res.status(401).send({auth: false, message: 'Invalid Credentials. Please log in as Admin to access this feature.'})
                    }
                    req.user = user;
                    return next();
                })
                .catch(err => next(err))
            } else {
                req.errors = err;
                return res.status(500).send('Admin Credentials Required.')
            }
        })
    }
}
module.exports = validateAdmin;