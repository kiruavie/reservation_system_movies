"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Reservation, {
        foreignKey: "user_id",
        as: "reservations",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      nom: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: { msg: "addresse email invalide" } },
      },
      mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 15],
            msg: "Ton mot de passe doit contenir entre 5(min) et 15(max) caratères",
          },
        },
      },
      role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.mot_de_passe) {
            const salt = await bcrypt.genSalt(10);
            user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("mot_de_passe")) {
            const salt = await bcrypt.genSalt(10);
            user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, salt);
          }
        },
      },
      defaultScope: {
        attributes: {
          exclude: ["mot_de_passe"],
        },
      },
    }
  );
  return User;
};
