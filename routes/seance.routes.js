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

const seanceRouter = express.Router();

seanceRouter.get("/", isAdmin, getAllSeances);
seanceRouter.get("/:id", isAdmin, getSeanceById);
seanceRouter.post("/", isAdmin, seanceValidation, createSeance);
seanceRouter.put("/:id", isAdmin, updateSeanceValidation, updateSeanceById);
seanceRouter.delete("/:id", isAdmin, deleteSeanceById);
