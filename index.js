const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./connection/connection');
const handlebars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const uuid = require('uuid4')

const treinadorController = require('./treinadores/treinadorController')
const alunosController = require('./alunos/AlunosController')
//database
connection
    .authenticate()
    .then(() => {
    console.log("Conexão feita com o banco de dados!")
})
.catch((msgErro) => {
    console.log(msgErro);  
 })
//session
app.use(session({
    secret: uuid(),
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
//middlewere
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.treinador = req.flash("logado")
    next()
})
//Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Public	
app.use(express.static(path.join(__dirname, "public")))


//Rotas
app.use('/',alunosController)
app.use('/',treinadorController)


app.listen(8080,()=>{
    console.log('Serve devidadamente iniciado')
})