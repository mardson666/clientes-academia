const Sequelize = require('sequelize')
const connection = require('../connection/connection')
const Professional = require('../professional/Professional')
const User = require('../user/User')
const Exercise = require('../exercise/Exercise')
const Training = connection.define('trainings',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    observation:{
        type:Sequelize.STRING,
        allowNull:false
    },
    data_treino:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

Professional.hasOne(Training,{
    foreignKey: 'professionalId'
})
User.hasOne(Training,{
    foreignKey: 'userId'
}, { timestamps: false })
Training.belongsTo(User)
Training.belongsTo(Professional)


Training.sync({force: false}).then(() => {});
module.exports = Training