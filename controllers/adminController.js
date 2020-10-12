const router = require('express').Router()

const User = require('../db').import('../models/userModel')
const validateSession = require('../middleware/validateSession');
const validateAdmin = require('../middleware/validateAdmin');
const bcrypt = require('bcryptjs')



/**************************************
 ********* GET USERS INFO *********
************************************ */

router.get('/users', validateAdmin, (req, res) => {
    User.findAll()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ message: 'Could not get user information. Please try again.', error: err }))
})

/**************************************
 ********* UPDATE USER *********
************************************ */
router.put('/users/:userId', validateAdmin, (req, res) => {
    console.log(req)
    const updateUser = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }
    const query = {
        where: {
            id: req.params.userId,
        }
    };
    User.update(updateUser, query)
        .then((userUpdated) => res.status(200).json({ message: 'Update was successful', NumberOfUsersUpdated: userUpdated }))
        .catch((err) => res.status(500).json({ message: 'Update Failed', error: err })
        );
});

/**************************************
********* UPDATE USER PASSWORD *********
************************************ */
router.put('/users/password/:userId', validateAdmin, (req, res) => {
    console.log(req)
    const updatePassword = {
        password: bcrypt.hashSync(req.body.password, 11)
    }
    const query = {
        where: {
            id: req.params.userId,
        }
    };
    User.update(updatePassword, query)
        .then((passwordUpdated) => res.status(200).json({ message: 'Update was successful', NumberOfPasswordsUpdated: passwordUpdated }))
        .catch((err) => res.status(500).json({ message: 'Update Failed', error: err })
        );
});


module.exports = router