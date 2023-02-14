const Sequelize = require('sequelize')

//configuração do banco de dados
const connection = new Sequelize('clientes','root','root',{
    host:'localhost',
    dialect:'mysql',
})

//Exportando para outros pacotes
module.exports = connection;