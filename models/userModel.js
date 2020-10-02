module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultsTo: 'campmate'
        }, 
        firstName: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })
    return User;
}