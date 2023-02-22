const express = require('express')
const Treinador = require('./treinador')
const router = express.Router()
const bcrypt = require('bcryptjs')





router.get('/registrar', (req,res)=>{
    res.render('registrar')
})
router.post('/save', (req,res)=>{
    var nome = req.body.nome
    var login = req.body.login
    var senha = req.body.senha
    var erros = []
    if(nome == undefined || nome == null ){
        erros.push({texto:"nome não pode esta vazio"})
    }
    if(login == undefined || login == null){
        erros.push({texto:"login não pode esta vazio"})
    }
    if(senha == undefined || senha == null){
        erros.push({texto:"login não pode esta vazio"})
    }
    if (senha.length < 6 || login.length < 6) {
        erros.push({texto:"a senha ou login não pode ter menos que 6 digitos"})
    }
    if (erros.length > 0) {
        res.render("registrar",{erros:erros})
    } else {
        Treinador.findOne({where:{login: login}}).then(treinador=>{
            if (treinador == undefined) {
                
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(senha,salt)

                Treinador.create({
                    nome:nome,
                    login:login,
                    senha:hash
                }).then(()=>{
                    req.flash("success_msg","Usuario cadastrado com sucesso")
                    res.redirect('/logar')
                }).catch((err)=>{
                    req.flash("error_msg","Error ao cadastra um usuario")
                    res.redirect('/registrar')
                })
            }else{
                req.flash("error_msg","login de usuario ja existe")
                res.redirect("/registrar");
            }

        })
        
    }
    
})
router.get('/logar',(req,res)=>{
    res.render('login')
})

router.post('/authenticate',(req,res)=>{
    var erros = []
    var login = req.body.login
    var senha = req.body.senha

    if (login == undefined || login == "" || login == null) {
        erros.push("error_msg","Usuario ou senha não foram preenchidos")
    }
   Treinador.findOne({where:{login:login}}).then(treinador=>{
        if (treinador != undefined) {
            var corrent = bcrypt.compareSync(senha,treinador.senha)
            if (corrent) {
                req.session.Treinador = {
                    id:treinador.id,
                    nome:treinador.nome
                }
                res.redirect("/principal/alunos")
            }else{
                req.flash("error_msg","Senha incorreta")
                res.redirect("/logar"); 
            }
        }else{
            req.flash("error_msg","usuario não existe")
            res.redirect("/logar"); 
        }
    })
})
router.get("/logout", (req, res) => {
    req.session.Treinador = undefined;
    res.redirect("/logar");
})


module.exports = router;