const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');
const auth = require('./middlewares/auth');
const setupSwagger = require('./swagger');

const router = express.Router();
const { swaggerUi, specs } = setupSwagger();

router.post('/signup', userMiddleware.validateUserData, userMiddleware.validateUserEmail, userController.signUp);
router.post('/signin', userMiddleware.validateUser, userController.signIn);

/**
 * @swagger
 * /email/{email}:
 *   get:
 *     summary: Get user information by email
 *     description: Returns the email and password of the user with the specified email.
 *     tags:
 *       - User
 *     parameters:
 *       - name: Authentication
 *         in: header 
 *         description: An authorization header
 *         required: true
 *         type: string
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email address of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               email: user@example.com
 *               senha: securepassword
 *       400:
 *         description: Email parameter invalid
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Parâmetro email inválido
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Token não fornecido
 *       403:
 *         description: Invalid session or not authorized
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Sessão inválida
 */
router.get('/email/:email', userMiddleware.validateParam, auth.authenticateToken, userController.getByEmail);

router.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(specs));

router.use((request, response) => {
    response.status(404).json({ mensagem: 'Rota não encontrada' });
});

module.exports = router;
