const { request, response } = require('../app');
const userModel = require('../models/userModel');

const signUp = async(request, response) => {
    const createdUser = await userModel.signUp(request.body);

    return response.status(201).json(createdUser);
};

module.exports ={
    signUp
}