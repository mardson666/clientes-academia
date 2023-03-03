function professionalAuth(req,res,next){
    if (req.session.Professional != undefined) {
        next()  
    }else{
        res.redirect("/logar")
    }
    
}

module.exports =  professionalAuth