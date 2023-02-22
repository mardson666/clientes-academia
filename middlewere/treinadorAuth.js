function treinadorAuth(req,res,next){
    if (req.session.Treinador != undefined) {
        next()  
    }else{
        res.redirect("/logar")
    }
    
}

module.exports =  treinadorAuth