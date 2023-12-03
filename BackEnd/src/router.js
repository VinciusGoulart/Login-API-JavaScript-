const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');
const auth = require('./middlewares/auth');
const setupSwagger = require('./swagger');

const router = express.Router();
const { swaggerUi, specs } = setupSwagger();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Returns user information and a JWT token upon successful registration
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: example
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@example.com
 *                 description: The email address of the user.
 *               senha:
 *                 type: string
 *                 example: "password"
 *                 description: The user's password.
 *               telefones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     numero:
 *                       type: string
 *                       example: "99999-9999"
 *                       description: The phone number.
 *                     ddd:
 *                       type: string
 *                       example: "11"
 *                       description: The area code.
 *     responses: 
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               data_criacao: "2023-12-01T00:00:00Z"
 *               data_atualizacao: "2023-12-01T00:00:00Z"
 *               ultimo_login: "2023-12-01T00:00:00Z"
 *               token: "your_jwt_token"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             examples:
 *               emailAlreadyExists:
 *                 value:
 *                   mensagem: E-mail já existe
 *               missingParameters:
 *                 value:
 *                   mensagem: Parâmetros nome, email, senha e telefones são obrigatórios
 */
router.post('/signup', userMiddleware.validateUserData, userMiddleware.validateUserEmail, userController.signUp);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in with email and password informations
 *     description: Returns user information
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               senha:
 *                 type: string
 *                 example: "password"
 *     responses: 
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             example:
 *               id: number
 *               data_criacao: date
 *               data_atualizacao: date
 *               ultimo_login: date
 *               token: JWT
 *       400:
 *         description: email/senha invalid values
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Usuario e/ou senha inválida  
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Usuario e/ou senha inválida 
 */
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
