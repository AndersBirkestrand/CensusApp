module.exports = (sequelize, Sequelize) => {
    const Participant = sequelize.define("Participant", {
      email: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        validate: { isEmail: true }
      },
      firstname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      dob: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      timestamps: false
    });

    Participant.associate = (models) => {
        Participant.hasOne(models.Work, {
            foreignKey: "participantEmail",
            onDelete: "CASCADE"
        });
        Participant.hasOne(models.Home, {
            foreignKey: "participantEmail",
            onDelete: "CASCADE"
        });
    };
    return Participant;
};