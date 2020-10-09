const router = require('express').Router()
const validateSession = require('../middleware/validateSession')
const Packlist = require('../db').import('../models/packlistModel')

/**************************************
 ********* GET MY PACKLISTS *********
************************************ */
router.get('/', validateSession, (req,res) => {
    let userid = req.user.id
    Packlist.findAll({
        where: {userId: userid},
        order: [['updatedAt', 'DESC']]
    })
    .then(packlists => res.status(200).json(packlists))
    .catch(err => res.status(500).json({message: 'Could not get packlists. Please try again.', error: err}))
})
/**************************************
 ********* NEW PACKLIST *********
************************************ */
router.post('/', validateSession, (req,res) => {
    const packlist = {
        title: req.body.title,
        userId: req.user.id
    }
    
    Packlist.create(packlist)
    .then(packlist => res.status(200).json({message: 'Successfully created new packlist', packlist: packlist}))
    .catch(err => res.status(500).json({message: 'Your packlist was not created. Please try again.', error: err}))

})

/**************************************
 ********* UPDATE A PACKLIST *********
************************************ */
router.put('/:id', validateSession, (req,res) => {

    const updatePacklist = {
        title: req.body.title
    }
    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id
 
        }
    };

    Packlist.update(updatePacklist, query)
    .then((packlistsUpdated) => res.status(200).json({message: 'Update was successful', NumberOfPacklistsUpdated: packlistsUpdated})) 
    .catch((err) => res.status(500).json({message: 'Update Title Failed',error: err})
);
});


/**************************************
 ********* DELETE A PACKLIST *********
************************************ */

router.delete('/:id', validateSession, (req,res) => {
    const thisPacklist = {where: {
        id: req.params.id,
        userId: req.user.id
    }}
    Packlist.findOne(thisPacklist)
    .then((results,err)=> {
        if (results){
            Packlist.destroy(thisPacklist)
            .then(()=> res.status(200).json({message: 'Your packlist was sucessfully deleted.'}))
            .catch((err)=> res.status(500).json({message: 'Something went wrong. Please try again.', error:err}))
            ;
        }  else {
            res.status(500).json({message: 'No packlist detected'})
        }
        if(err){
            console.log(err);
        }
    }) .catch((err) => res.status(500).json({message:'Cannot find your information.', error: err}))
})

module.exports = router;