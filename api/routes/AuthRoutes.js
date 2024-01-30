/** @format */

const express = require("express");
const route = express.Router();
const {
  register,
  login,
  isAuth,
  logout,
} = require("../controller/authController");
const { isAuthenticated } = require("../middleware/Auth");
route.post("/register", register);
route.post("/login", login);
route.get("/is-auth", isAuthenticated, isAuth);
route.get("/logout", logout);

module.exports = route;
