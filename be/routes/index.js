const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
// const authApi = require("./auth.api");
const photoApi = require("./photo.api");

router.use("/user", userApi);
// router.use("/auth", authApi);
router.use("/photo", photoApi);

module.exports = router;