const connection = require('./connection');

const getEmail = async (email) => {
    const [user] = await connection.execute('SELECT email FROM usuario WHERE email = ?;', [email]); 
    
    return user;
};

const signUp = async (userData) => {
    const { nome, email, senha, telefones } = userData;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO usuario(nome, email, senha, data_criacao, data_atualizacao, ultimo_login, token) VALUES (?,?,?,?,?,?,?)';

    const [created] = await connection.execute(query,[nome, email, senha, dateUTC, dateUTC, dateUTC, 'token']);

    telefones.forEach(async element => {
        const telQuery = 'INSERT INTO telefone(numero, ddd, usuario_id) VALUES (?,?,?)';     
    
        await connection.execute(telQuery,[element.numero, element.ddd, created.insertId]);
    });
    

    return {
        id: created.insertId,
        data_criacao: dateUTC,
        data_atualizacao: dateUTC,
        ultimo_login: dateUTC,
        token: 'token'
    };
};

module.exports = {
    signUp,
    getEmail
}