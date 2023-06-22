"user strict";

const jsonschema = require("jsonschema")

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens")
const userRegisterSchema = require('../schemas/userRegister.json');
const userAuthSchema = require('../schemas/userAuth.json');

const { BadRequestError } = require("../expressError");


/**
 * 
 * 
 * authenticates a login
 * 
 * 
 */
router.post("/login", async function (req, res, next) {
  console.log("login route working")
  try{
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if(!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const {username, password} = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    console.log(token)
    return res.json({token});
  } catch (e){
    return next(e)
  }
})

/**
 * 
 * 
 * register a new user
 * 
 * 
 */


router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if(!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({ ...req.body, isAdmin: false});
    const token = createToken(newUser);
    return res.status(201).json({token});
  } catch(e) {
    return next(e);
  }
});

module.exports = router;