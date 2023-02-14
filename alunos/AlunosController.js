const express = require('express')
const Aluno = require('./Aluno')
const router = express.Router()

router.get("/principal/alunos",(req,res)=>{
    Aluno.findAll().then(alunos =>{
        
        res.render("index", {alunos:alunos})
    })
})
router.post("/principal/cad", (req,res)=>{
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var numero = req.body.numero;
    var idade = req.body.idade;
    var altura = req.body.altura;
    var peso = req.body.peso;
    var status = req.body.status;
    var imc = req.body.imc;
    var data_nasci = req.body.data_nasci;
    var email = req.body.email;

    Aluno.create({
        cpf:cpf,
        nome:nome,
        email:email,
        numero:numero,
        data_nasci:data_nasci,
        idade:idade,
        altura:altura,
        peso:peso,
        imc:imc,
        status:status
    }).then(()=>{
        res.redirect("/principal/alunos")
    })

})
router.post('/principal/delete',(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
        Aluno.destroy({
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
router.get('/principal/edit/:id', (req,res)=>{
    var id = req.params.id;
    Aluno.findByPk(id).then(alunos =>{
        if(alunos != undefined){
            res.render("edit",{alunos:alunos})
        }else{
            res.redirect("/principal/alunos")
        }
    })
})
router.post('/principal/upadate', (req,res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var numero = req.body.numero;
    var idade = req.body.idade;
    var altura = req.body.altura;
    var peso = req.body.peso;
    var status = req.body.status;
    var imc = req.body.imc;
    var data_nasci = req.body.data_nasci;
    var email = req.body.email;
    
    Aluno.update({cpf:cpf, nome:nome, email:email, numero:numero, data_nasci:data_nasci
        , idade:idade, altura:altura, peso:peso, imc:imc, status:status
    },{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/principal/alunos")

    }).catch(err=>{
        res.redirect('/principal/alunos')
    })
})
module.exports = router