const express = require("express");
const {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilmById,
  getFilmsWithSeancesByDate,
} = require("../controllers/film.controller.js");
const { isAdmin } = require("../middlewares/admin.middleware.js");
const {
  createFilmValidation,
  updateFilmValidation,
} = require("../middlewares/validation.middleware.js");
const { isAuth } = require("../middlewares/auth.middleware.js");

const FilmRouter = express.Router();

FilmRouter.get("/", isAdmin, getAllFilms);
FilmRouter.get("/:id", isAdmin, getFilmById);
FilmRouter.post("/", isAdmin, createFilmValidation, createFilm);
FilmRouter.put("/:id", isAdmin, updateFilmValidation, updateFilm);
FilmRouter.delete("/:id", isAdmin, deleteFilmById);

// Voir les films et leurs séances par date (user)
//films?date=2025-05-18
FilmRouter.get("/", isAuth, getFilmsWithSeancesByDate);

module.exports = FilmRouter;
