const Sequelize = require("sequelize")
const connection = require('../connection/connection')

const Professional = connection.define('professionals',{
    cpf:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    data_nasci:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
Professional.sync({force:false}).then(()=>{});
module.exports = Professional;