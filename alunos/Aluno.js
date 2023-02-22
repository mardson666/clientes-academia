const Sequelize = require("sequelize")
const connection = require("../connection/connection");
const Treinador = require("../treinadores/treinador");
const Aluno = connection.define('alunos',{
    cpf:{
        type:Sequelize.STRING,
        allowNull:false
    },

    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }, 
    numero:{
        type:Sequelize.STRING,
        allowNull:false
    },
    data_nasci:{
        type:Sequelize.STRING,
        allowNull:false
    },
    idade:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    altura:{
        type:Sequelize.FLOAT,
        allowNull:true
    },
    peso:{
        type:Sequelize.FLOAT,
        allowNull:true
    },
    imc:{
        type:Sequelize.FLOAT,
        allowNull:true
    },
    status:{
        type:Sequelize.STRING,
        allowNull:true 
    },


}
);
Treinador.hasMany(Aluno,{
    foreignKey: 'treinadorId'
});
Aluno.sync({force: false}).then(() => {});
module.exports = Aluno;