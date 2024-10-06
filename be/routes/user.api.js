const express = require("express");
const router = express.Router();
const userApi = require("./user.api");

const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

// 회원가입
router.post('/', userController.createUser);
router.post("/login", userController.loginWithEmail);

// 토큰 값으로 사용자 정보 가져오기
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
