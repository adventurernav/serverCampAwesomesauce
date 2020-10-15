const router = require('express').Router()
const https = require("https")

const apiKey = 'ab2707783011dbb21c3894c3349952c8'

router.get('/:year', (req,res)=>{
    const year = req.params
    let url = `https://${apiKey}:@api.burningman.org/api/v1/art?year=${year}`
    https.get(url, details => {
        details.on('data', detailData =>{
            let parsedDetail = JSON.parse(detailData)
            res.json(parsedDetail)
        })
    })
})

module.exports = router