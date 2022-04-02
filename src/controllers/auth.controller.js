const User = require('../modules/user.modul');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const newToken = (users)=>{
   // console.log(process.env.key)
    return jwt.sign({users},process.env.key);
 }
const register = async (req, res) => {
  try {
     let users = await User.findOne({email:req.body.email});
    
  

     if(users){
        return res.status(400).send({email:'email already exists'}); 
     }
    users = await User.create(req.body);
     const token = newToken(users);
     return res.status(200).send({users,token});
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};





const login = async (req, res) => {
  try {
     const users = await User.findOne({email:req.body.email});
     if(!users){
        return res.status(400).send('wrong Email or password'); 
     
     }
     const match = users.checkPassword(req.body.password);
    //return res.status(200).send("login");
    if(!match){
        return res.status(400).send({message:'wrong Email or password'}); 
     }

     const token = newToken(users);
     return res.status(200).send({users,token});
  } catch (e) {
    res.status(500).send({ message: e.message+"hhhh" });
  }
};

module.exports = { register, login,newToken };
