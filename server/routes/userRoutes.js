const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/userControllers");

//* Params
router.param("userId", userControllers.getUserById);

//* GETUSER GET Route
router
    .route("/getuser/:userId")
    .get(userControllers.getUser);

module.exports = router;