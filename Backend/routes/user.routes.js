const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register', [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must have at least 2 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
],
userController.registerUser
);

router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
],
userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.post('/logout', authMiddleware.authUser, userController.logoutUser);



module.exports = router;