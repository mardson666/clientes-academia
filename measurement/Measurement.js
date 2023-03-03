const Sequelize = require('sequelize');
const connection = require("../connection/connection");
const User = require('../user/User')

const Measurement = connection.define('measurements',{
    height:{
        type:Sequelize.STRING,
        allowNull:false

    },
    weight:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imc:{
        type:Sequelize.STRING,
        allowNull:false
    },
    bust:{
        type:Sequelize.STRING,
        allowNull:false
    },
    calf:{
        type:Sequelize.STRING,
        allowNull:false
    },
    hip:{
        type:Sequelize.STRING,
        allowNull:false
    },
    biceps:{
        type:Sequelize.STRING,
        allowNull:false
    },
    thigh:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

User.hasOne( Measurement, {
    foreignKey: 'userId'
}); 
Measurement.belongsTo(User)
Measurement.sync({force: false}).then(() => {});
module.exports = Measurement;