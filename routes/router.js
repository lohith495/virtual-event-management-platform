const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const eventsController = require("../controllers/eventsController");
const router = express.Router();

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/events", eventsController);

module.exports = router;