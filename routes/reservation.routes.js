const express = require("express");
const {
  createReservation,
  getReservationById,
  getAllReservations,
  deleteReservation,
  updateReservationStatut,
  cancelReservation,
} = require("../controllers/reservation.controller.js");
const ReservationRouter = express.Router();
const { isAuth } = require("../middlewares/auth.middleware.js");
const { isAdmin } = require("../middlewares/admin.middleware.js");

// Routes spécifiques d'abord
ReservationRouter.get("/me", isAuth, getAllReservations);
ReservationRouter.get("/all", isAuth, isAdmin, getAllReservations);

// Routes avec paramètres dynamiques ensuite
ReservationRouter.post("/", isAuth, createReservation);
ReservationRouter.get("/:id", isAuth, getReservationById);
ReservationRouter.delete("/:id", isAuth, isAdmin, deleteReservation);
ReservationRouter.patch(
  "/:id/statut",
  isAuth,
  isAdmin,
  updateReservationStatut
);
ReservationRouter.patch("/cancel/:id", isAuth, cancelReservation);

module.exports = ReservationRouter;
