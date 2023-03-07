const express = require('express')
const router = express.Router()
const Exercise = require('./Exercise')
const professionalAuth = require("../middlewere/professionalAuth")


router.get("/exercises",professionalAuth,(req,res)=>{
    var id = req.session.Professional.id
    Exercise.findAll({where:{professionalId:id}}).then(exercise=>{
        res.render('cadexercise',{exercise:exercise})
    })
})

router.post('/exercises/save',professionalAuth,(req,res)=>{
    var {name,description,category} = req.body
    var id = req.session.Professional.id

    Exercise.create({
        name:name,
        description:description,
        category:category,
        professionalId:id
    }).then(()=>{
        req.flash("success_msg","cadastro realizado com sucesso")
        res.redirect('/exercises')
    }).catch((err)=>{
        req.flash("error_msg","erro ao cadastrar exercicio")
        res.redirect('/exercises')
    })
})

router.post('/exercises/delete',professionalAuth,(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Exercise.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/exercises')
            })
        }else{
            res.redirect('/exercises')
        }
    }else{
        res.redirect('/exercises')
    }
        
    
})



module.exports = router