module.exports = (sequelize, Sequelize) => {
    const Work = sequelize.define("Work", {
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
      companyname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      salary: {
        type: Sequelize.DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      currency: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: "work",
      timestamps: false
    });
  
    Work.associate = (models) => {
      Work.belongsTo(models.Participant, {
        foreignKey: "participantEmail",
        onDelete: "CASCADE"
      });
    };
    return Work;
};