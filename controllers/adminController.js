const router = require('express').Router()
const User = require('../db').import('../models/userModel')
const Profile = require('../db').import('../models/profileModel')
const validateSession = require('../middleware/validateSession');
const validateAdmin = require('../middleware/validateAdmin');


/**************************************
 ********* GET USERS INFO *********
************************************ */

router.get('/users', validateAdmin, (req,res) => {
    User.findAll()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({message: 'Could not get user information. Please try again.', error: err}))
})

module.exports = router