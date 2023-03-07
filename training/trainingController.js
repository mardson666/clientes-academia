const express = require("express")
const router = express.Router()
const Training = require('./Training')
const User = require('../user/User')

const professionalAuth = require('../middlewere/professionalAuth')

router.get('/training/cad/:id',professionalAuth, (req,res)=>{
    var userid = req.params.id
    var id = req.session.Professional.id
    User.findAll({where:{id:userid}}).then(user=>{
        Training.findAll({where:{id:id}}).then(training=>{
            res.render('cadtreining',{training:training, user:user})
        })
    })
})

router.post('/training/save',professionalAuth,(req,res)=>{
    var {name,observation,data_treino,userId} = req.body
    var id = req.session.Professional.id

    Training.create({
        name:name,
        observation:observation,
        data_treino:data_treino,
        professionalId:id,
        userId:userId
    }).then(()=>{
        req.flash("success_msg","cadastro realizado com sucesso")
        res.redirect('/principal/alunos')
    }).catch((err)=>{
        req.flash("error_msg","erro ao cadastrar treino")
        res.redirect('/principal/alunos')
    })
})




module.exports = router