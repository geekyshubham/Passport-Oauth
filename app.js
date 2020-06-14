
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const ev=require('dotenv').config()
const mongoose=require('mongoose')
//EJS init
app.use(expressLayouts);
app.set("view engine","ejs");

app.use('/',require("./routes/index"));
app.use('/users',require("./routes/users"));

//Body PARSER
app.use(express.urlencoded({ extended:false}));

//

app.listen(3000,console.log("server is up & running... ")) ;

//MONGOOSE CONNECTION
mongoose.connect(process.env.DBSTRING,{useNewUrlParser:true,useUnifiedTopology: true })
    .then(()=> console.log("MongoDB connected !!"))
    .catch(err=> console.log(err))
