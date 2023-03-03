const express = require('express')
const Professional = require('./Professional')
const router = express.Router()
const bcrypt = require('bcryptjs')





router.get('/registrar', (req,res)=>{
    res.render('registrar')
})
router.post('/save', (req,res)=>{
    var name = req.body.nome
    var email = req.body.email
    var password = req.body.password
    var cpf = req.body.cpf
    var number = req.body.number
    var date = req.body.date
    var erros = []
    if(name == undefined || name == null ){
        erros.push({texto:"nome não pode esta vazio"})
    }
    if(cpf == undefined || cpf == null ){
        erros.push({texto:"cpf não pode esta vazio"})
    }
    if(number == undefined || number == null ){
        erros.push({texto:"number não pode esta vazio"})
    }
    if(date == undefined || date == null ){
        erros.push({texto:"data de nascimento não pode esta vazio"})
    }
    if(email == undefined || email == null){
        erros.push({texto:"login não pode esta vazio"})
    }
    if(password == undefined || password == null){
        erros.push({texto:"login não pode esta vazio"})
    }
    if (password.length < 6 || password.length < 6) {
        erros.push({texto:"a senha ou login não pode ter menos que 6 digitos"})
    }
    if (erros.length > 0) {
        res.render("registrar",{erros:erros})
    } else {
        Professional.findOne({where:{email: email}}).then(professional=>{
            if (professional == undefined) {
                
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(password,salt)

                Professional.create({
                    cpf:cpf,
                    name:name,
                    email:email,
                    number:number,
                    data_nasci:date,
                    password:hash
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
    var email = req.body.email
    var password = req.body.password

    if (email == undefined || email == "" || email == null) {
        erros.push("error_msg","Usuario ou senha não foram preenchidos")
    }
        Professional.findOne({where:{email:email}}).then(professional=>{
            if (professional != undefined) {
                var corrent = bcrypt.compareSync(password,professional.password)
                if (corrent) {
                    req.session.Professional = {
                        id:professional.id,
                        name:professional.name
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
    req.session.Professional = undefined;
    res.redirect("/logar");
})


module.exports = router;