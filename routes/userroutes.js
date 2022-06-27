const usercontroller = require("../controllers/usercontroller");
const express = require("express");
const router = express.Router();

router.get("/", usercontroller.getAllUsers);
router.post("/signup", usercontroller.postSignUp);
router.post("/login", usercontroller.logIn);

module.exports = router;