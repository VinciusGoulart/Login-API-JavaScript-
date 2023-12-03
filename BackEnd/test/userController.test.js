const controller = require('../src/controllers/userController');
const httpMocks = require('node-mocks-http');
const userModel = require('../src/models/userModel');

const userModelMockEmail = jest.spyOn(userModel, 'getByEmail');
const userModelMockSignIn = jest.spyOn(userModel, 'signIn');
const userModelMockSignUp = jest.spyOn(userModel, 'signUp');

describe("Check method \'userController\' ", () => {
    it('should get user data from a email', async () => {
        // mock
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();

        const mockEmail = jest.fn(async () => {
            return { email: 'example@email.com', senha: 'password' };
        });

        userModelMockEmail.mockImplementation(mockEmail);

        await controller.getByEmail(request, response);

        expect(userModelMockEmail).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
    });

    it('should sign in with email and password informations', async () => {
        //mock
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();

        const mockUserData = jest.fn(async () => {
            return {
                "id": 1,
                "data_criacao": "Date",
                "data_atualizacao": "Date",
                "ultimo_login": "Date",
                "token": "JWT"
            }
        });

        userModelMockSignIn.mockImplementation(mockUserData);

        await controller.signIn(request, response);

        expect(response.statusCode).toEqual(200);
    });

    it('should return 200 if Register a new user', async () => {
        //mock
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();

        const mockUserData = jest.fn(async () => {
            return {
                "id": 1,
                "data_criacao": "Date",
                "data_atualizacao": "Date",
                "ultimo_login": "Date",
                "token": "JWT"
            }
        });

        userModelMockSignUp.mockImplementation(mockUserData)

        await controller.signUp(request,response);

        expect(response.statusCode).toEqual(201);
    });
});
