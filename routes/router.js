const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const router = express.Router();

router.use("/register", registerController);
router.use("/login", loginController);

module.exports = router;