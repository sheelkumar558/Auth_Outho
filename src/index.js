const express = require("express");
const connect = require("./configs/db");

const userController = require('./controllers/user.controller');
const { register, login,newToken } = require('./controllers/auth.controller');
const productController = require("./controllers/product.controller");
const passport = require("./configs/google-ouath");
const app = express();
app.use(express.json());

app.use('/users',userController);

app.post('/register',register);
app.post('/login',login);
app.use("/products",productController)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
  const token = newToken(req.user)
//const token = newToken(users);
  return res.status(200).send({user:req.user,token});
    
  });

app.listen(4444, async()=>{
    try{
      await connect();
      console.log("listening on port 4444");
    }catch(e){
        console.error({message:e.message});
    }
});