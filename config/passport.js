const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../models/user')

module.exports= (passport) =>{
    passport.use(new LocalStrategy(
        { usernameField: 'mail' },(mail, password, done) =>{
          User.findOne({ mail: mail }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect Mail' });
            }
            bcrypt.compare(password,user.password,(err,result)=>
            {
                if(err) throw err;

                if(result){
                  return done(null,user);
                }
                else{return done(null,false,{message:"Password Incorrect"})} 
            });
            
          });
        }
      ));
      passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
          done(err, user);
        });
      });
}

