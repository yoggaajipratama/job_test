const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Example',
            version: '1.0.0',
            description: 'A simple Express API',
        },
    },
    apis: ['./infrastructure/routes/api.js'],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = {
    swaggerUi: swaggerUi.serve,
    specs: swaggerUi.setup(specs),
};

module.exports = swaggerDocs;
