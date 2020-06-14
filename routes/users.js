const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended:false}));

router.get("/login",(req,res)=>{
    res.render('login',{
        message:String
    })
});

router.get('/register',(req,res)=>{
    res.render('register',{
        message:String
    })
});


router.post('/register',(req,res)=>{
    
    console.log(req.body);
const {mail,name,password,cPassword} = req.body; 

let errors =[];

if (!mail || !name || !password || !cPassword){
    errors.push({
        msg:"Please fill up al the fields "
    });
}
if (password != cPassword){
    errors.push({
        msg:"Please enter correct password"
    });
}

if(password.length < 6){
    errors.push({
        msg:"Password must of 6 or more characters"
    });
}

if(errors.length > 0){
    res.render("register",{
        errors,
        name,
        mail,
        password,
        cPassword
    })
}else{
    res.send("Pass")
}

});
module.exports = router;