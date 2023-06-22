"use strict";

const User = require("../models/user")

const jsonschema = require("jsonschema")

const express = require("express")
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth")
const {createToken } = require("../helpers/tokens");

const userNewSchema = require("../schemas/userNew.json")
const userUpdateSchema = require("../schemas/userUpdate.json");
const { BadRequestError } = require("../expressError");

const router = new express.Router();

/** 
 * 
 * Admin added user
 * 
 * 
 */
router.post("/", ensureAdmin, async function (req, res, next){
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if(!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201). json({user, token});
  } catch(e){
    return next(e)
  }
})

/**
 * 
 * Gets all users
 * 
 * 
 */
router.get("/", async function (req, res, next) {
  try{
    const users = await User.findAll();
    return res.json({users});
  } catch(e){
    return next(e)
  }
});

/** 
 * 
 * Gets information about single user
 * 
 * 
 */
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  }catch(e){
    return next(e);
  }
})
/**
 * 
 * Edit a user 
 * 
 * 
 */
router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if(!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.update(req.params.username, req.body);
    return res.json({user});
  } catch(e) {
    console.log("error")
    return next(e);
  }
})

/**
 * 
 * Delete a user
 * 
 * 
 */
router.delete("/:username", async function (req, res, next){
  try{
    await User.remove(req.params.username);
    return res.json({deleted:req.params.username});
  } catch(e){
    return next(e)
  }
})

module.exports = router;