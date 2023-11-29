const connection = require('./connection');

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM userData');
    return users;
};

const signUp = async (userData) => {
    const { nome, email, senha, telefones } = userData;

    const dateUTC = new Date(Date.now()).toUTCString(); 

    const query = 'INSERT INTO userData(nome, email, senha, telefones, data_criacao, data_atualizacao, ultimo_login, token) VALUES (?,?,?,?,?,?,?,?)';

    const [created] = await connection.execute(query,
        [nome, email, senha, telefones, dateUTC, dateUTC, dateUTC, 'token']); // Correção nos placeholders

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
    getAll
}