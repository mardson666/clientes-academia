const Sequelize = require("sequelize")
const connection = require("../connection/connection");
const Professional = require("../professional/Professional");
const User = connection.define('users',{
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
    age:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    status:{
        type:Sequelize.STRING,
        allowNull:true 
    },
    objective:{
        type:Sequelize.STRING,
        allowNull:true 
    }

}
);
Professional.hasMany(User,{
    foreignKey: 'professionalId'
});
User.sync({force: false}).then(() => {});
module.exports = User;