const express = require('express');
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');
const auth = require('./middlewares/auth');

const router = express.Router();

router.post('/signup', userMiddleware.validateUserEmail, userController.signUp);
router.post('/signin', userMiddleware.validateUser,userController.signIn);
router.get('/email/:email', auth.authenticateToken,userController.getEmail);

/*router.get('/usuario', auth.authenticateToken, (req, res) => { 
    res.json({ mensagem: 'Usuário autenticado com sucesso', usuario: req.user });
  });
*/

module.exports = router;