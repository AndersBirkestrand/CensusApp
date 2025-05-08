module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", {
        login: {
            type: Sequelize.DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        
    }, {
        tableName: "admins",
        timestamps: false
    });
    return Admin;
};