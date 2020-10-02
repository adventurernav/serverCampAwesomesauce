require('dotenv').config()
const cors = require('cors')
const express = require('express');
const app = express();
const PORT = process.env.PORT;
let sequelize = require('./db');

app.use(cors())

const user = require('./controllers/userController')
const packlist = require('./controllers/packlistController')
const item = require('./controllers/itemController')
const profile = require('./controllers/profileController')

sequelize.sync();
// sequelize.sync({force: true})
app.use(require('./middleware/headers'))
app.use(express.json());

/**************************************
 ********* Exposed Routes ************
************************************ */

app.use('/user', user)

/**************************************
 ********* Protected Routes ************
************************************ */
app.use(require('./middleware/validateSession'))
app.use('/packlist', packlist)
app.use('/item', item)

app.use('/profile', profile)

// app.use('/admin', admin)

//******************************** */
// app.get("*", (req, res)=>{
//     res.status(404).send("Sorry, nothing found here");

// })

app.listen(PORT, function(){
    console.log(`SERVER is listening on port ${PORT}`)
})