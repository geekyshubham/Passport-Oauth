
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash')
const session = require('express-session')
const ev=require('dotenv').config()
const mongoose=require('mongoose');
const passport = require('passport');
//EJS init
app.use(expressLayouts);
app.set("view engine","ejs");



//Body PARSER
app.use(express.urlencoded({ extended:false}));

//session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
//pasport initialization   
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());


//Global VARIABLES FOR FLASH MESAGES
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
   res.locals.error_msg =req.flash("error_msg");
   res.locals.error =req.flash("error");

   next();
   })

   //routes
app.use('/',require("./routes/index"));
app.use('/users',require("./routes/users"));


//MONGOOSE CONNECTION
mongoose.connect(process.env.DBSTRING,{useNewUrlParser:true,useUnifiedTopology: true })
    .then(()=> console.log("MongoDB connected !!"))
    .catch(err=> console.log(err))
//Listen Connection
app.listen(3000,console.log("server is up & running... ")) ;
