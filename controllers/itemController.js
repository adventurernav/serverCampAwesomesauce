const router = require('express').Router()
const validateSession = require('../middleware/validateSession')
const Item = require('../db').import('../models/itemModel')

/**************************************
 ********* GET ITEMS OF PACKLIST *********
************************************ */
router.get('/:packlistId', validateSession, (req,res) => {
    Item.findAll({
        where: {packlistId: req.params.packlistId},
        order: [['updatedAt', 'DESC']]
    })
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({message: 'Could not get items. Please try again.', error: err}))
})
/**************************************
 ********* NEW ITEM *********
************************************ */
router.post('/:packlistId', validateSession, (req,res) => {
    const item = {
        itemName: req.body.itemName,
        isOwned: req.body.isOwned,
        isPacked: req.body.isPacked,
        qty: req.body.qty,
        packlistId: req.params.packlistId,
        userId: req.user.id
    }
    Item.create(item)
    .then(item => res.status(200).json({message: 'Successfully created new item', item: item}))
    .catch(err => res.status(500).json({message: 'Your item was not created. Please try again.', error: err}))

})

/**************************************
 ********* UPDATE ITEM *********
************************************ */
router.put('/:itemId', validateSession, (req,res) => {
    const updateItem = {
        itemName: req.body.itemName,
        isOwned: req.body.isOwned,
        isPacked: req.body.isPacked,
        qty: req.body.qty,
        packlistId: req.params.packlistId
    }
    const query = {
        where: {
            id: req.params.itemId, 
        }
    };
    Item.update(updateItem, query)
    .then((itemsUpdated) => res.status(200).json({message: 'Update was successful', NumberOfItemsUpdated: itemsUpdated})) 
    .catch((err) => res.status(500).json({message: 'Update Failed',error: err})
);
});


/**************************************
 ********* DELETE ITEM *********
************************************ */

router.delete('/:id', validateSession, (req,res) => {
    const thisItem = {where: {
        id: req.params.id
    }}
    Item.findOne(thisItem)
    .then((results,err)=> {
        if (results){
            Item.destroy(thisItem)
            .then(()=> res.status(200).json({message: 'Your item was sucessfully deleted.'}))
            .catch((err)=> res.status(500).json({message: 'Something went wrong. Please try again.', error:err}))
            ;
        }  else {
            res.status(500).json({message: 'No item detected'})
        }
        if(err){
            console.log(err);
        }
    }) .catch((err) => res.status(500).json({message:'Cannot find your information.', error: err}))
})

module.exports = router;