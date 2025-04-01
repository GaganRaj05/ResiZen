const express = require('express');
const {handleLogin, handleRegistration, handleLogout} = require("../controllers/auth");
const upload = require("../config/multerConfig");
const router = express.Router();

router.post("/sign-in",handleLogin);
router.post("/sign-up",upload.single("image"),handleRegistration);
router.post("/sign-out",handleLogout);

module.exports = router;
