const router = require('express').Router()
const User = require('../db').import('../models/userModel')
const validateSession = require('../middleware/validateSession');

/**************************************
 ********* Verify User *********
************************************ */

router.get('/', validateSession, (req,res) => {
    let userid = req.user.id
    User.findOne({
        where: {id: userid}
    })
    .then(user => res.status(200).json({message: 'Success'}))
    .catch(err => res.status(500).json({message: 'Could not get token. Please try again.', error: err}))
})

module.exports = router