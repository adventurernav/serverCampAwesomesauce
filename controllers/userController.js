const router = require('express').Router()
const User = require('../db').import('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validateSession = require('../middleware/validateSession');

/**************************************
 ********* SIGN UP / REGISTER *********
************************************ */
router.post('/register', (req,res) => {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 11),
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    .then(
        function createSuccess(user){
            let token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.json({
                message: 'Account sucessfully created. Welcome to Camp Awesomesauce!',
                user:user, 
                sessionToken: token
            })
        }
    )
    .catch(err=>res.status(500).json({error:err}))
})
/**************************************
 ********* SIGN IN / LOGIN ************
************************************ */
router.post('/login', (req,res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(function loginSuccess(user){
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, matches)=>{
                if (matches){
                    let token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
        
                    res.status(200).json({
                        message: 'Login successful! Welcome back.',
                        user:user,
                        sessionToken: token
                    })
                } else {
                    res.status(401).send({error: "Login failed. Verify your credentials and try again."})
                }
            })
        } else {
            res.status(500).json({ error: 'User information not found. Verify your credentials and try again.'})
        }
    })
    .catch(err => res.status(500).json({
        message: 'Authentication Failed. Please try again.',
        error: err}))
})

/**************************************
 ********* UPDATE USER INFO ************
************************************ */

router.put('/', validateSession, (req,res) => {

    const updateUser = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 11)
    }
    const query = {
        where: {
            id: req.user.id, 
        }
    };

    User.update(updateUser, query)
    .then((usersUpdated) => res.status(200).json({message: 'Update was successful', NumberOfUsersUpdated: usersUpdated})) 
    .catch((err) => res.status(500).json({message: 'Update Failed',error: err})
);
});


/**************************************
 ********* DELETE ACCOUNT ************
************************************ */
router.delete('/', validateSession, (req,res) => {
    const thisUser = {where: {
        id: req.user.id
    }}
    User.findOne(thisUser)
    .then((results,err)=> {
        if (results){
            User.destroy(thisUser)
            .then(()=> res.status(200).json({message: 'Your account was sucessfully deleted.'}))
            .catch((err)=> res.status(500).json({message: 'Something went wrong. Please try again.', error:err}))
            ;
        }  else {
            res.status(500).json({message: 'No user detected'})
        }
        if(err){
            console.log(err);
        }
    }) .catch((err) => res.status(500).json({message:'Cannot find your information.', error: err}))
})

/**************************************
 ********* GET USER INFO *********
************************************ */

router.get('/', validateSession, (req,res) => {
    let userid = req.user.id
    User.findOne({
        where: {id: userid}
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({message: 'Could not get user information. Please try again.', error: err}))
})

module.exports = router