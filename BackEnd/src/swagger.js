const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Configuração do Swagger
 * @returns {Object} Objeto contendo as configurações do Swagger
 */
function setupSwagger() {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'User API',
                version: '1.0.0',
                description: 'Documentation for the user API',
            },
            
        },
        apis: ['src/router.js'], // Caminho para os arquivos de rota da sua API
    };

    const specs = swaggerJsdoc(options);

    return {
        swaggerUi,
        specs,
    };
}

module.exports = setupSwagger;
