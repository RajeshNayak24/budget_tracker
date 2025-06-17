const express = require('express');
const router = express.Router();
const { loginUser, signupUser } = require('../controllers/authController');
const { updatePassword } = require("../controllers/authController");
// const authMiddleware = require("../middleware/authMiddleware");
const verifyToken = require("../middleware/authMiddleware");



router.post('/login', loginUser);
router.post('/signup', signupUser);
router.put("/updatepassword", verifyToken, updatePassword);

module.exports = router;
