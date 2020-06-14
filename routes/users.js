const express = require("express");
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcrypt');
const { Console } = require("console");
const passport = require("passport")
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
  User.findOne({mail:mail})
    .then(user => {
        if(user){
      errors.push({msg:"User already exists with this email address"});
      res.render("register",{
        errors,
        name,
        mail,
        password,
        cPassword
    });
  }else{
      newUser = new User( {
          name,
          mail,
          password

      })
      //Hashing Pass
      bcrypt.genSalt(10,(err,salt)=> bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) throw err
          newUser.password=hash;
          newUser.save()
          .then(user=>{
            req.flash('success_msg',"You have been successfully registered")  
            res.redirect("login");
        })
          .catch(err=>Console.log(err));
      }))

  }
    
})
}
});
router.post('/login',(req,res,next)=>{

passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/users/login',
    failureFlash:true
})(req,res,next);
})

router.get('/logout',(req,res)=>{
req.logout();
req.flash(
    'success_msg',"You are logged out"
)
res.redirect('login')
});

module.exports = router;