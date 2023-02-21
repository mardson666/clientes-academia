const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./connection/connection');
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
//enginer ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))


//bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.use('/',alunosController)


app.listen(8080,()=>{
    console.log('Serve devidadamente iniciado')
})