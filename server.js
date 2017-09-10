const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js')

const dev = process.env.NODE_ENV !== "production"
const PORT = process.env.PORT || 4000;
var models = require('./db/models');
// models.User.findAll().then((users) =>{
//     console.log(users);
// })

app.use('/graphql', expressGraphQL({
    schema,
    graphiql : dev,
    pretty:dev
}))

models.sequelize.sync({ force: false,logging: console.log, alter: false }).then(function() {
    app.listen(PORT, () => {
        console.log('Server is running on port 4000..')
    })
});    
