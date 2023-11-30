const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const authenticateToken = (request, response, next) => {
    const token = request.header('Authentication');

    if (!token) {
        return response.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const [bearer, tokenValue] = token.split(' ');

    if (bearer !== 'Bearer' || !tokenValue) {
        return response.status(401).json({ mensagem: 'Formato de token inválido' });
    }

    jwt.verify(tokenValue, secret, (err, decoded) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return response.status(403).json({ mensagem: 'Sessão inválida' });
            } else {
                return response.status(403).json({ mensagem: 'Não autorizado' });
            };
        };

        request.id = decoded.userId;
        next();
    });
};

module.exports = {
    authenticateToken
};