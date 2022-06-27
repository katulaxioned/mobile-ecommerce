const express = require("express");
const storeController = require("../controllers/storecontroller");
const isAuth = require("../middleware/auth");

const router = express.Router();

router.get("/", storeController.getMobileDevice);
router.post("/add", isAuth, storeController.addMobileDevice);
router.patch("/update/:id", isAuth, storeController.updateMobileDevice);
router.delete("/delete/:id", isAuth, storeController.deleteMobileDevice);

module.exports = router;