module.exports = (sequelize, Sequelize) => {
    const Home = sequelize.define("Home", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      participantEmail: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "participant_email"
      },
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: "home",
      timestamps: false
    });
  
    Home.associate = (models) => {
      Home.belongsTo(models.Participant, {
        foreignKey: "participantEmail",
        onDelete: "CASCADE"
      });
    };
    return Home;
};