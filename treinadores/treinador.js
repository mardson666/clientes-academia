const Sequelize = require("sequelize")
const connection = require('../connection/connection')

const Treinador = connection.define('treinadores',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    login:{
        type:Sequelize.STRING,
        allowNull:false
    },
    senha:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
Treinador.sync({force:false}).then(()=>{});
module.exports = Treinador;