//const { promise, reject } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    var decoded = jwt.verify(token, process.env.key, (err, decoded) => {
      if (err) 
        return reject(err);

        return resolve(decoded);
      
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) 
    return res
      .status(400)
      .send({ message: "Athorization token not found or incorrect" });
  

  if (!req.headers.authorization.startsWith("Bearer")) 
    return res
      .status(400)
      .send({ message: "Athorization token not found or incorrect" });
  
  const token = req.headers.authorization.trim().split(" ")[1];
  let decoded;

  try {
    decoded = await verifyToken(token);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Athorization token not found or incorrect" });
  }
  console.log(decoded);
  //verifyToken(token);
  req.user = decoded.user;
  return next();
};

module.exports = authenticate;
