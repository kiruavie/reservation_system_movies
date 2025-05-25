const express = require("express");
const {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilmById,
} = require("../controllers/film.controller.js");
const { isAdmin } = require("../middlewares/admin.middleware.js");
const {
  createFilmValidation,
  updateFilmValidation,
} = require("../middlewares/validation.middleware.js");

const FilmRouter = express.Router();

FilmRouter.get("/", isAdmin, getAllFilms);
FilmRouter.get("/:id", isAdmin, getFilmById);
FilmRouter.post("/", isAdmin, createFilmValidation, createFilm);
FilmRouter.put("/:id", isAdmin, updateFilmValidation, updateFilm);
FilmRouter.delete("/:id", isAdmin, deleteFilmById);

module.exports = FilmRouter;
