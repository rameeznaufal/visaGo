const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/authControllers");

//* SIGNUP POST Route
router
    .route("/signup")
    .post(authControllers.signup);

// //* SIGNIN POST Route
router
    .route("/signin")
    .post(authControllers.signin);

//* SIGNOUT GET Route
router
    .route("/signout")
    .get(authControllers.signout);

module.exports = router;