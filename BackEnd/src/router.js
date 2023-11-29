const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

const router = express.Router();

router.post('/signin', userMiddleware.validateUserEmail, userController.signUp)

module.exports = router;