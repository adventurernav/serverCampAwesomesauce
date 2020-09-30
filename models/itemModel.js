module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
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
            defaultsTo: 1
        }
    })
    return Item;
}