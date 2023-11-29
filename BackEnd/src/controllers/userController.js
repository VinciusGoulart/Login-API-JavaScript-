const { request, response } = require('../app');
const userModel = require('../models/userModel');

const getAll = async (_request, response) => {

    const users = await userModel.getAll();
    return response.status(200).json(users);
};

const signUp = async(request, response) => {
    const createdUser = await userModel.signUp(request.body);

    return response.status(201).json(createdUser);
};

module.exports ={
    signUp,
    getAll
}