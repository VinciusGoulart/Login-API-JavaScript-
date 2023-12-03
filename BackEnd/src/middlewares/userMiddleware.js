const userModal = require('../models/userModel');
const bcrypt = require('bcrypt');

const validateUserEmail = async (request, response, next) => {
    const { email } = request.body;

    const user = await userModal.getByEmail(email);

    if (user.length > 0) {
        return response.status(400).json({ mensagem: 'E-mail já existe' });
    };

    next();
};

const validateUser = async (request, response, next) => {
    const { email, senha } = request.body;

    if (!senha || !email) {

        return response.status(400).json({ mensagem: 'Usuario e/ou senha invalida' });
    };

    const [user] = await userModal.getByEmail(email);

    if (!user || !bcrypt.compareSync(senha, user.senha)) {
        return response.status(401).json({ mensagem: 'Usuario e/ou senha invalida' });
    };

    next();
};

const validateUserData = async (request, response, next) => {
    const { nome, email, senha, telefones } = request.body;

    if (!nome || !email || !senha || !telefones || telefones.length === 0) {
        return response.status(400).json({ mensagem: 'Parametros nome, email, senha e telefones são obrigatorios' });
    };

    next();
};

const validateParam = async (request, response, next) => {
    const { email } = request.params;

    if (!email) {
        return response.status(400).json({ mensagem: 'Parâmetro email inválido' });
    }

    next();
};

module.exports = {
    validateUserEmail,
    validateUser,
    validateUserData,
    validateParam
};