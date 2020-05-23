const express = require('express');
const userController = require('../controllers/users-controller');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', userController.getUsers);

router.post(
  '/signup',
  [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Password is too short').isLength({ min: 6 }),
  ],
  userController.signup
);

router.post('/login', userController.login);

module.exports = router;
