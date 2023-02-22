const express = require('express')
const Aluno = require('./Aluno')
const router = express.Router()
const Treinador = require('../treinadores/treinador')

router.get("/principal/alunos",(req,res)=>{
    var idsession = req.session.Treinador.id
    var id = idsession
    console.log(id)
    
    Aluno.findAll({where:{treinadorId:id}}).then(alunos =>{
        res.render("index", {alunos:alunos})
    }).catch((error)=>{
        req.flash("error_msg","erro listar alunos")
        res.redirect('/principal/alunos', )
    })
})
router.get('/principal/cadastro', (req,res)=>{
    console.log(req.session.Treinador.id)
    var id = req.session.Treinador
    
    Treinador.findByPk(id).then(treinador=>{
        res.render('cad', {treinador})
    })
    
})
router.post("/principal/cad", (req,res)=>{
    var erros = []
    //requisições do body(formulario)
    
    console.log(req.session.Treinador)
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var numero = req.body.numero;
    var altura = req.body.altura;
    var peso = req.body.peso;
    var status = req.body.status;
    var data_nasci = req.body.data_nasci;
    var email = req.body.email;
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
    var idade_atual =  data_atual - ano 
    //calculo de imc
    var imc = peso / (altura * altura)
    //colocar hifen no numero
    var parte1 = numero.slice(0,5)
    var parte2 = numero.slice(5,9)
    var numeroAjustado = `${parte1}-${parte2}`
    //colocar ponto e hifen no cpf  
    parte1 = cpf.slice(0,3)
    parte2 = cpf.slice(3,6)
    parte3 = cpf.slice(6,9)
    parte4 = cpf.slice(9.11)
    var cpfAjustado = `${parte1}.${parte2}.${parte3}-${parte4}`
    if (nome != undefined || cpf != undefined || numero != undefined ||
        altura != undefined || peso != undefined || status != undefined ||
        data_nasci != undefined || email != undefined || id != undefined) {
        
            erros.push({texto:"Voce deixou algum campo em branco"})
    } 
    if (erros.length > 0) {
        res.render("cad",{erros:erros})
    }else{
        
    Aluno.create({
        cpf:cpfAjustado,
        nome:nome,
        email:email,
        numero:numeroAjustado,
        data_nasci:data_nasci_formated,
        idade:idade_atual,
        altura:altura,
        peso:peso,
        imc:imc,
        status:status
    }).then(()=>{
        req.flash("success_msg","cadastro realizado com sucesso")
        res.redirect('/principal/alunos')
    }).catch((err)=>{
        req.flash("error_msg","erro ao cadastrar aluno")
        res.redirect('/principal/alunos')
    })
        
    }


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
    //requisições do body(formulario)
    var id = req.body.id;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var numero = req.body.numero;
    var altura = req.body.altura;
    var peso = req.body.peso;
    var status = req.body.status;
    var data_nasci = req.body.data_nasci;
    var email = req.body.email;
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
    var idade_atual =  data_atual - ano 
    //calculo de imc
    var imc = peso / (altura * altura)
    //colocar hifen no numero
    var parte1 = numero.slice(0,5)
    var parte2 = numero.slice(5,9)
    var numeroAjustado = `${parte1}-${parte2}`
    console.log(idade_atual)
    //colocar ponto e hifen no cpf  
    parte1 = cpf.slice(0,3)
    parte2 = cpf.slice(3,6)
    parte3 = cpf.slice(6,9)
    parte4 = cpf.slice(9.11)
    var cpfAjustado = `${parte1}.${parte2}.${parte3}-${parte4}`
    
    Aluno.update({cpf:cpfAjustado, nome:nome, email:email, numero:numeroAjustado, data_nasci:data_nasci_formated
        , idade:idade_atual, altura:altura, peso:peso, imc:imc, status:status
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