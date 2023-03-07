const Sequelize = require('sequelize')
const connection = require("../connection/connection");
const Training = require('../training/Training')
const Exercise = require('../exercise/Exercise')

const TrainingExercise = connection.define('trainingexercises',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false    
    }
},{ timestamps: false })

Training.belongsToMany(Exercise,{
    through: TrainingExercise,
    as:'trainings',
    foreignKey:"trainingId"

})
Exercise.belongsToMany(Training,{
    through: TrainingExercise,
    as:'exercises',
    foreignKey:"exerciseId"

})
TrainingExercise.sync({force: false}).then(() => {});
module.exports = TrainingExercise
