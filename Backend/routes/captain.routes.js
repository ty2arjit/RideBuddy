const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must have at least 2 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must have at least 3 characters'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate number must have at least 3 characters'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
  body('vehicle.type').isIn(['car', 'bike', 'scooter', 'auto']).withMessage('Vehicle type must be one of: car, bike, scooter, auto'),
],
captainController.registerCaptain);

router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
],
captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;