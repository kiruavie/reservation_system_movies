"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Seance, {
        foreignKey: "seance_id",
        as: "seance",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      this.hasMany(models.ReservationSiege, {
        foreignKey: "reservation_id",
        as: "reservationsieges",
        onDelete: "CASCADE",
      });
    }
  }
  Reservation.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      seance_id: { type: DataTypes.INTEGER, allowNull: false },
      date_reservation: { type: DataTypes.DATE, allowNull: false },
      statut: {
        type: DataTypes.ENUM("en attente", "confirmé", "annulé"),
        defaultValue: "en attente",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reservation",
      underscored: true,
      timestamps: true,
    }
  );
  return Reservation;
};
