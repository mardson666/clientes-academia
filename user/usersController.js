const express = require('express')
const User = require('./User')
const router = express.Router()
const Professional = require('../professional/Professional')
const professionalAuth = require('../middlewere/professionalAuth')


router.get("/principal/alunos",professionalAuth,(req,res)=>{

    var id = req.session.Professional.id
    User.findAll({where:{professionalId:id}}).then(user =>{
        res.render("index", {user:user})
    }).catch((error)=>{
        req.flash("error_msg","erro listar alunos")
        res.redirect('/principal/alunos')
    })
})
router.get('/principal/cadastro', professionalAuth,(req,res)=>{
        res.render('cad')
})
router.post("/principal/cad",professionalAuth, (req,res)=>{
    var erros = []
    //requisições do body(formulario)
    
    var id = req.session.Professional.id
    var name = req.body.name;
    var cpf = req.body.cpf;
    var number = req.body.number;
    var status = req.body.status;
    var data_nasci = req.body.data_nasci;
    var email = req.body.email;
    var objective = req.body.objective
    //formatar data para br
    var data = new Date(data_nasci);
    var dia = data.getDate();
    dia = dia + 1;
    var mes = data.getMonth();
    mes = mes + 1;
    var ano = data.getFullYear();
    //data formatada
    var data_nasci_formated = dia+"/"+mes+"/"+ano;

    //calculo de idade(não exata por enquanto)
    var data_atual = new Date()
    data_atual = data_atual.getFullYear()
    var age =  data_atual - ano 
    //calculo de imc
    //var imc = peso / (altura * altura)
    //colocar hifen no numero
    var parte1 = number.slice(0,5)
    var parte2 = number.slice(5,9)
    var numeroAjustado = `${parte1}-${parte2}`
    //colocar ponto e hifen no cpf  
    parte1 = cpf.slice(0,3)
    parte2 = cpf.slice(3,6)
    parte3 = cpf.slice(6,9)
    parte4 = cpf.slice(9.11)
    var cpfAjustado = `${parte1}.${parte2}.${parte3}-${parte4}`
    if (name == undefined || cpf == undefined || number == undefined || status == undefined ||
        data_nasci == undefined || email == undefined) {
        
            erros.push({texto:"Voce deixou algum campo em branco"})
    } 
    if (erros.length > 0) {
        res.render("cad",{erros:erros})
    }else{
        
    User.create({
        cpf:cpfAjustado,
        name:name,
        email:email,
        number:numeroAjustado,
        data_nasci:data_nasci_formated,
        age:age,
        status:status,
        objective:objective,
        professionalId:id
    }).then(()=>{
        req.flash("success_msg","cadastro realizado com sucesso")
        res.redirect('/principal/alunos')
    }).catch((err)=>{
        req.flash("error_msg","erro ao cadastrar aluno")
        res.redirect('/principal/alunos')
    })
        
    }


})
router.post('/principal/delete',professionalAuth,(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
        User.destroy({
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
router.get('/principal/edit/:id',professionalAuth, (req,res)=>{
    var id = req.params.id;
    User.findByPk(id).then(user =>{
        if(user != undefined){
            res.render("edit",{user:user})
        }else{
            res.redirect("/principal/alunos")
        }
    })
})
router.post('/principal/upadate', professionalAuth,(req,res)=>{
    //requisições do body(formulario)
    var id = req.body.id;
    var name = req.body.name;
    var cpf = req.body.cpf;
    var number = req.body.number;
    var status = req.body.status;
    var data_nasci = req.body.data_nasci;
    var email = req.body.email;
    var objective = req.body.objective
    //formatar data para br
    var data = new Date(data_nasci);
    var dia = data.getDate();
    dia = dia + 1;
    var mes = data.getMonth();
    mes = mes + 1;
    var ano = data.getFullYear();
    //data formatada
    var data_nasci_formated = dia+"/"+mes+"/"+ano;
    //calculo de idade(não exata por enquanto)
    var data_atual = new Date()
    data_atual = data_atual.getFullYear()
    var age =  data_atual - ano 
    //calculo de imc
    //var imc = peso / (altura * altura)
    //colocar hifen no numero
    var parte1 = number.slice(0,5)
    var parte2 = number.slice(5,9)
    var numeroAjustado = `${parte1}-${parte2}`
    console.log(idade_atual)
    //colocar ponto e hifen no cpf  
    parte1 = cpf.slice(0,3)
    parte2 = cpf.slice(3,6)
    parte3 = cpf.slice(6,9)
    parte4 = cpf.slice(9.11)
    var cpfAjustado = `${parte1}.${parte2}.${parte3}-${parte4}`
    
    User.update({
        cpf:cpfAjustado, 
        nome:name, 
        email:email, 
        number:numeroAjustado, 
        data_nasci:data_nasci_formated, 
        age:age,
        status:status,
        objective:objective
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