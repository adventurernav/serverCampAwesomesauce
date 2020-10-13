module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultsValue: 'campmate',
            validate: {
                isIn: [['campmate', 'admin', 'test']]
            }
        }, 
        firstName: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        lastName: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                isAlpha: true
            }
        }
    })
    return User;
}