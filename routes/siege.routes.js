const express = require("express");
const { getSiegesDisponibles } = require("../controllers/siege.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const SiegeRouter = express.Router();

SiegeRouter.get("/", isAuth, getSiegesDisponibles);

module.exports = SiegeRouter;
