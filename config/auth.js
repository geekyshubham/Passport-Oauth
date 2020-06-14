module.exports={
    ensureAuthenticated:(req,res,next)=>{
    if(req.ensureAuthenticated){
            return next();
    }
    req.flash('error_msg',"Please Login to view this resource")
    res.redirect('/users/login')
}
}