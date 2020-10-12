const router = require('express').Router()
const Profile = require('../db').import('../models/profileModel')
const validateSession = require('../middleware/validateSession');

/**************************************
 ********* NEW PROFILE *********
************************************ */
router.post('/register/:id', validateSession, (req, res) => {
    const checkForProfile = {
        where: {
            userId: req.user.id
        }
    }
    Profile.findAll(checkForProfile)
        .then((results, err) => {
            if (results.length === 0) {
                Profile.create({
                    playaname: req.body.playaname,
                    profilePic: req.body.profilePic,
                    status: req.body.status,
                    burnsAttended: req.body.burnsAttended,
                    favPrinciple: req.body.favPrinciple,
                    aboutMe: req.body.aboutMe,
                    userId: req.user.id

                })
                    .then(
                        function createSuccess(profile) {
                            res.json({
                                message: 'Profile sucessfully created. Welcome to Camp Awesomesauce!',
                                profile: profile,
                            })
                        }
                    )
                    .catch(err => res.status(500).json({ error: err }))
            } else {
                res.status(409).json({ message: 'You already have a profile. Try editing instead.' })
            }
            if (err) {
                console.log(err);
            }
        }).catch((err) => res.status(500).json({ message: 'Cannot find your information.', error: err }))

})

/**************************************
 ********* UPDATE PROFILE ************
************************************ */

router.put('/', validateSession, (req, res) => {

    const updateProfile = {
        playaname: req.body.playaname,
        profilePic: req.body.profilePic,
        status: req.body.status,
        burnsAttended: req.body.burnsAttended,
        favPrinciple: req.body.favPrinciple,
        aboutMe: req.body.aboutMe
    }
    const query = {
        where: {
            userId: req.user.id,
        }
    };

    Profile.update(updateProfile, query)
        .then((profileUpdated) => {
            if (profileUpdated[0] === 1) {
                return res.status(200).json({message: `Update was sucessful`})
            } else {
                return res.status(500).json({message: `There is something weird going on here. You should come check this code because the update shows in pg admin but you're gettin this error message. Something went wrong while trying to update your profile. Please try again later.`})
            }
        })
        .catch((err) => res.status(500).json({ message: 'Update Failed', error: err })
        );
});


/**************************************
 ********* DELETE PROFILE ************
************************************ */
router.delete('/:id', validateSession, (req, res) => {
    const thisProfile = {
        where: {
            userId: req.params.id,
            userId: req.user.id
        }
    }
    Profile.findOne(thisProfile)
        .then((results, err) => {
            if (results) {
                Profile.destroy(thisProfile)
                    .then(() => res.status(200).json({ message: 'Your profile was sucessfully deleted.' }))
                    .catch((err) => res.status(500).json({ message: 'Something went wrong. Please try again.', error: err }))
                    ;
            } else {
                res.status(500).json({ message: 'No profile detected' })
            }
            if (err) {
                console.log(err);
            }
        }).catch((err) => res.status(500).json({ message: 'Cannot find your information.' }))
})


/**************************************
 ********* GET MY PROFILE INFO *********
************************************ */

router.get('/', validateSession, (req, res) => {
    let searchid = req.user.id
    Profile.findOne({
        where: { userId: searchid }
    })
        .then(users => res.status(200).json({message: 'User(s) found:', users: users}))
        .catch(err => res.status(500).json({ message: 'Could not get user information. Please try again.', error: err }))
})

/**************************************
 ********* GET ANY PROFILE INFO *********
************************************ */

router.get('/:id', validateSession, (req, res) => {
    let searchid = req.params.id
    Profile.findOne({
        where: { userId: searchid }
    })
        .then(users => res.status(200).json({message: 'User(s) found:', users: users}))
        .catch(err => res.status(500).json({ message: 'Could not get user information. Please try again.', error: err }))
})

module.exports = router