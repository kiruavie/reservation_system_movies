const express = require("express");
const { Sequelize } = require("sequelize");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const FilmRouter = require("./routes/film.routes");
const seanceRouter = require("./routes/seance.routes");
const authRouter = require("./routes/auth.routes");
const app = express();

// middlewares pour analyser les requêtes HTTP
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// middlewares pour les routes

// films routes
app.use("/api/v1/films", FilmRouter);

// seances routes
app.use("/api/v1/seances", seanceRouter);

// authentication routes
app.use("/api/v1/auth", authRouter);

// connexion à la base de donnée
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès !");
  } catch (error) {
    console.error(
      "❌ Impossible d'accéder à la base de données :",
      error.message
    );
    process.exit(1);
  }
})();

module.exports = app;
