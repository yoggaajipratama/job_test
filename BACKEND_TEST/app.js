const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const conn = require('./database/connection')
const swaggerDocs = require('./swagger');
const apiRoutes = require('./infrastructure/routes/api')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

conn.connect((err) => {
    if (err) console.log(err)
    else {
        // console.log(`Database Connected!`)
    }
})

app.use('/api-docs', swaggerDocs.swaggerUi, swaggerDocs.specs)
app.use('/api', apiRoutes);

module.exports = app

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}