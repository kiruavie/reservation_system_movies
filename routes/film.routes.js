const express = require("express");
const {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilmById,
} = require("../controllers/film.controller.js");
const { isAdmin } = require("../middlewares/admin.middleware.js");

const router = express.Router();

router.get("/", isAdmin, getAllFilms);
router.get("/:id", isAdmin, getFilmById);
router.post("/", isAdmin, createFilm);
router.put("/:id", isAdmin, updateFilm);
router.delete("/:id", isAdmin, deleteFilmById);

module.exports = router;
