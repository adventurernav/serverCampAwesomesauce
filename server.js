require('dotenv').config()
const cors = require('cors')
const express = require("express");
const app = express();
const PORT = process.env.PORT;
let sequelize = require('./db');

app.use(cors())

const user = require('./controllers/userController')
const packlist = require('./controllers/packlistController')
const item = require('./controllers/itemController')
const profile = require('./controllers/profileController')

sequelize.sync();

app.use(express.json());

// *****************************

app.use('/user', user)
app.use('/profile', profile)
app.use('/packlist', packlist)
app.use('/packlist/item', item)

// app.use('/admin', admin)


//******************************** */
app.get("*", (req, res)=>{
    res.status(404).send("Sorry, nothing found here");

})

app.listen(PORT, ()=>{
    `SERVER is listening on port ${PORT}`
})