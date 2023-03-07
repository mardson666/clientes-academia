const Sequelize = require("sequelize")
const connection = require("../connection/connection");
const Professional = require('../professional/Professional')
const Training = require("../training/Training")
const TrainingExercises = require('../training_relationship/Trainingexercise')
const Exercise = connection.define('exercises',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },

}, { timestamps: false })
Professional.hasOne( Exercise, {
    foreignKey: 'professionalId'
}); 
Exercise.belongsTo(Professional)


    
Exercise.sync({force: false}).then(() => {});
module.exports = Exercise;
