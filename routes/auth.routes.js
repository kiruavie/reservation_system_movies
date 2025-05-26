const express = require("express");
const {
  RegisterController,
  LoginController,
} = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validation.middleware");

const authRouter = express.Router();

authRouter.post("/register", registerValidator, RegisterController);
authRouter.post("/login", loginValidator, LoginController);

module.exports = authRouter;
