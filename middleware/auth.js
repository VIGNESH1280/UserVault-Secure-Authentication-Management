const jwt = require("jsonwebtoken");
const User = require("../models/users.models");
const TOKEN_SECRET = "mytokensecret";

const auth = async (req, res, next) => {
  const check = req.headers.authorization;

  if (!check) {
    return res.status(401).send("Access Denied");
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const generateToken = async (payload) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1h" }); //jsw.sign() is a predefined method, that generate the token during login & signUp
  //algorithm:'HS256', issuer:'admin'
};
module.exports = { auth, generateToken };

//token --> header, payload, signature
//payload --> which data is used to identify the user
//Signature--TOKEN_SECRET --> custom key that we use as salt to better encrypt our token
//properties --> expoiresIn, algorithm, issuer
