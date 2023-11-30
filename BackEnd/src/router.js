const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');
const auth = require('./middlewares/auth');

const router = express.Router();

router.post('/signup', userMiddleware.validateUserData, userMiddleware.validateUserEmail, userController.signUp);
router.post('/signin', userMiddleware.validateUser, userController.signIn);
router.get('/email/:email', userMiddleware.validateParam, auth.authenticateToken, userController.getByEmail);
router.use((request, response) => {
    response.status(404).json({ mensagem: 'Rota não encontrada' });
});

module.exports = router;