const express = require("express");
const { register, login, adminLogin, verifyAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.get("/verify-admin", verifyAdmin);
module.exports = router
