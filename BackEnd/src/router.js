const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

const router = express.Router();

router.post('/signup', userMiddleware.validateUserEmail, userController.signUp);
router.post('/signin', userMiddleware.validateUser,userController.signIn)

module.exports = router;