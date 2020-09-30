module.exports = (sequelize, DataTypes) => {
    const Packlist = sequelize.define('packlist', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })
    return Packlist;
}