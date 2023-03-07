const express = require('express')
const router = express.Router()
const professionalAuth = require('../middlewere/professionalAuth')
const Trainingexercise = require('./Trainingexercise')
const Training = require('../training/Training')
const Exercise = require('../exercise/Exercise')


router.get('/training/exercise/:id',professionalAuth,(req,res)=>{
    var id = req.params.id
    var userId = req.session.Professional.id
    
    Training.findAll({where:{id:id}}).then(training=>{
        Exercise.findAll({where:{professionalId:userId}}).then(exercise=>{
            res.render("cadtrainingexercise",{training:training,exercise:exercise})
        })
    })
     
})

router.post('/training/exercise/save',professionalAuth,(req,res)=>{
    var exercisesId = req.body.exercise
    var trainingId = req.body.training

    Trainingexercise.create({
        exerciseId:exercisesId,
        trainingId:trainingId
    }).then(()=>{
        req.flash("success_msg","cadastro realizado com sucesso")
        res.redirect('/principal/alunos')
    })
    

})





module.exports = router