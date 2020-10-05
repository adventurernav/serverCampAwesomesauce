module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        playaname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            required: true,
            validate: {
                isAlphanumeric: true
            }
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultsTo: 'https://images-na.ssl-images-amazon.com/images/I/71%2BncdWcmRL.png'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        burnsAttended: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { isInt: true, }
        },
        favPrinciple: {
            type: DataTypes.STRING,
            allowNull: true,
            isIn: [['Radical Inclusion', 'Gifting', 'Decommodification', 'Radical Self-reliance', 'Radical Self-expression', 'Communal Effort', 'Civic Responsibility', 'Leave No Trace', 'Participation', 'Immediacy']]
        },
        aboutMe: {
            type: DataTypes.STRING,
            allowNull: true
        }

    })
    return Profile;
}