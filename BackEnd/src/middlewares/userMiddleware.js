const { request, response } = require('../app');
const userModal = require('../models/userModel');

const validateUserEmail = async (request, response, next) => {
    const { email } = request.body;

    const user = await userModal.getEmail(email);

    if (user.length > 0) {
        return response.status(400).json({menssagem: 'E-mail já existe' })
    };

    next();
};

const validateUser = async (request,response,next) => {
    const { email , senha} = request.body;

   
    const [user] = await userModal.getEmail(email);

    if(user.length === 0 || user.senha !== senha) {
        return response.status(401).json({menssagem: 'Usuario e/ou senha invalida'});
    };

    next();
};

module.exports = {
    validateUserEmail,
    validateUser
};