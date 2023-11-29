const userModal = require('../models/userModel');

const validateUserEmail = async (request, response, next) => {
    const { email } = request.body;

    const user = await userModal.getEmail(email);

    if (user.length > 0) {
        return response.status(400).json({ message: 'E-mail já existe' })
    }

    next();
}

module.exports = {
    validateUserEmail
};