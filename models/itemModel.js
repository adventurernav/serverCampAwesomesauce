module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {isAlphanumeric: true }
        },
        isOwned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultsTo: false
        },
        isPacked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultsTo: false
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultsTo: 1,
            validate: {isInt: true}
        }
    })
    return Item;
}