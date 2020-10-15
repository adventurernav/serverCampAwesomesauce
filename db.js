const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL,  { 
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(
        function () {
            console.log('Connected to pg db');
        },
        err => { console.log(err) }
    )
    .catch(err => console.log(err))

User = sequelize.import('./models/userModel');
Profile = sequelize.import('./models/profileModel');
Packlist = sequelize.import('./models/packlistModel');
Item = sequelize.import('./models/itemModel');

User.hasOne(Profile,{onDelete:'cascade'});
Profile.belongsTo(User);

Packlist.belongsTo(User,{onDelete:'cascade'});
User.hasMany(Packlist);

Item.belongsTo(Packlist);
Packlist.hasMany(Item)

module.exports = sequelize;