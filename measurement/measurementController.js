const express = require('express')
const router = express.Router()
const User = require('../user/User')
const Measurement = require('./Measurement')
const professionalAuth = require('../middlewere/professionalAuth')


router.get('/measurement/:id',professionalAuth, (req,res)=>{
    var id = req.params.id
    User.findAll({where:{id:id}}).then(user=>{
        Measurement.findAll({where:{userId:id}}).then(measurement=>{
            res.render('measurement',{measurement:measurement,user:user})
        }).catch(error=>{
            req.flash("error_msg","erro listar medição")
            res.redirect('/principal/alunos')
        })
    }).catch(error=>{
        req.flash("error_msg","erro listar alunos")
        res.redirect('/principal/alunos')
    })
   
})
router.get('/measurement/edit/:id',(req,res)=>{
    var id = req.params.id
    Measurement.findAll({where:{id:id}}).then(measurement=>{
        res.render('editmeasurement',{measurement:measurement})
    })
})
router.post('/measurement/edit',(req,res)=>{
    var {height,weight,imc,bust,calf,hip,biceps,thigh,userId} = req.body
    Measurement.update({
        height:height,
        weight:weight,
        imc:imc,
        bust:bust,
        calf:calf,
        hip:hip,
        biceps:biceps,
        thigh:thigh,
        userId:userId
    }).then()
})
router.post('/measurement/delete',professionalAuth,(req,res)=>{
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
        Measurement.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect('/principal/alunos')
        })
    }else{
        res.redirect('/principal/alunos')
    }
    }else{res.redirect('/principal/alunos')}

})
router.post('/measurament/create/:id',(req,res)=>{
    var {height,weight,imc,bust,calf,hip,biceps,thigh,userId} = req.body

    Measurement.create({
        height:height,
        weight:weight,
        imc:imc,
        bust:bust,
        calf:calf,
        hip:hip,
        biceps:biceps,
        thigh:thigh,
        userId:userId
    }).then(()=>{
        req.flash("success_msg","cadastro realizado com sucesso")
        res.redirect('/principal/alunos')
    }).catch((err)=>{
        req.flash("error_msg","erro ao cadastrar medição")
        res.redirect('/principal/alunos')
    })
})
// var {height,weight,imc,bust,calf,hip,biceps,thigh,userId} = req.body


module.exports = router