const { request, response } = require('../app');
const userModel = require('../models/userModel');

const signUp = async (request, response) => {
    const user = await userModel.signUp(request.body);

    return response.status(201).json(user);
};

const signIn = async (request, response) => {
    const user = await userModel.signIn(request.body);

    return response.status(200).json(user);
}

const getEmail = async (request, response) => {
    const {email} = request.params;

    const user = await userModel.getEmail(email);

    return response.status(200).json(user);
};

module.exports = {
    signUp,
    signIn,
    getEmail
}