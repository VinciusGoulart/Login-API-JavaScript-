const connection = require('./connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET

const getEmail = async (email) => {
    const [user] = await connection.execute('SELECT email,senha FROM usuario WHERE email = ?;', [email]);

    return user;
};

const signUp = async (userData) => {
    const { nome, email, senha, telefones } = userData;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO usuario(nome, email, senha, data_criacao, data_atualizacao, ultimo_login, token) VALUES (?,?,?,?,?,?,?)';

    const [created] = await connection.execute(query, [nome, email, senha, dateUTC, dateUTC, dateUTC, '']);

    telefones.forEach(async element => {
        const telQuery = 'INSERT INTO telefone(numero, ddd, usuario_id) VALUES (?,?,?)';

        await connection.execute(telQuery, [element.numero, element.ddd, created.insertId]);
    });
    
    const token = await createJWtToken(created.insertId);    

    return {
        id: created.insertId,
        data_criacao: dateUTC,
        data_atualizacao: dateUTC,
        ultimo_login: dateUTC,
        token: token
    };
};

const signIn = async (userData) => {
    const {email} = userData;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'SELECT id,data_criacao,data_atualizacao,token FROM usuario WHERE email = ?;';

    const [user] = await connection.execute(query, [email]);

    const {id, data_criacao, data_atualizacao} = user[0];

    const token = await createJWtToken(id);  
    
    return {
        id,
        data_criacao,
        data_atualizacao,
        ultimo_login: dateUTC,
        token
    };
}

const createJWtToken = async (id) =>{
    const token = jwt.sign({id},secret,{expiresIn: 50});

    const query = 'UPDATE usuario SET token = ? WHERE id = ?';

    await connection.execute(query,[token,id]);

    return token;
}

module.exports = {
    signUp,
    getEmail,
    signIn
}