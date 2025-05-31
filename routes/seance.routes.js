const express = require("express");
const {
  getAllSeances,
  getSeanceById,
  createSeance,
  updateSeanceById,
  deleteSeanceById,
} = require("../controllers/seance.controller");
const { isAdmin } = require("../middlewares/admin.middleware");
const {
  seanceValidation,
  updateSeanceValidation,
} = require("../middlewares/validation.middleware");
const { isAuth } = require("../middlewares/auth.middleware");

const seanceRouter = express.Router();

seanceRouter.get("/admin/all", isAdmin, getAllSeances);
seanceRouter.get("/admin/:id", isAdmin, getSeanceById);
seanceRouter.post("/admin/", isAdmin, seanceValidation, createSeance);
seanceRouter.put(
  "/admin/:id",
  isAdmin,
  updateSeanceValidation,
  updateSeanceById
);
seanceRouter.delete("/:id", isAdmin, deleteSeanceById);

// voir toutes les seances (temps de spectables de films)
seanceRouter.get("/user/seances", isAuth, getAllSeances);
seanceRouter.get("/user/seances/:id", isAuth, getSeanceById);

module.exports = seanceRouter;
