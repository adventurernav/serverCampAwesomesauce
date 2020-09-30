module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        playaname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            required: true
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
            allowNull: true
        },
        favPrinciple: {
            type: DataTypes.STRING,
            allowNull: true
        },
        aboutMe: {
            type: DataTypes.STRING,
            allowNull: true
        }

    })
    return Profile;
}