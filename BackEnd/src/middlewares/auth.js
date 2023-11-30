const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const authenticateToken = (request, response, next) => {
    const token = request.header('Authentication');

    if (!token) {
        return response.status(401).json({ menssagem: 'Token não fornecido' });
    }
   
    const [bearer, tokenValue] = token.split(' ');

    if (bearer !== 'Bearer' || !tokenValue) {
        return response.status(401).json({ menssagem: 'Formato de token inválido' });
    }

    jwt.verify(tokenValue, secret, (err, decoded) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return response.status(403).json({ menssagem: 'Sessão inválida' });
            }else{
                return response.status(403).json({ menssagem: 'Não autorizado' });
            }            
        }
        
        request.id = decoded.userId;
        next();
    });
};

module.exports = {
    authenticateToken
}