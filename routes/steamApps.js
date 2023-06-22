"use strict";

const express = require("express");
const SteamApp = require("../models/steamApp");
const router = new express.Router();

/**
 * 
 * 
 * GET - send data to steam database
 * 
 * 
 */
router.get("/updatedb", async function(req, res, next){
  const data = await SteamApp.updateSteamDatabase()
  return res.json({data})
})

/**
 * 
 * 
 * GET - Search apps by query
 * 
 * 
 */
router.get("/search", async function (req, res, next){
  const q = req.query.searchTerm;
  try{
    const data = await SteamApp.getByName(q)
    console.log(data)
    return res.json({ data })
  } catch(e){
    return next(e)
  }
})

/**
 * 
 * 
 * GET - Get details about one app by appid
 * 
 * 
 */
router.get("/:appid", async function (req, res, next){
  const appid = req.params.appid
  try{
    const data = await SteamApp.getAppDetails(appid)
    return res.json(data)
  } catch(e){
    return next(e)
  }
})

router.get("/", async function (req, res, next){
  const data = await SteamApp.checkFavorites();
  return res.json(data)
})

/**
 * 
 * 
 * GET - Get all news articles about single game using appid
 * 
 * 
 */
router.get("/news/:appid", async function (req, res, next) {
  try {
    const news = await SteamApp.getAppNews(req.params.appid);
    return res.json({news});
  } catch (e) {
    return next(e)
  }
})

/**
 * 
 * 
 *  GET - Get all apps that user has added to their dashboard
 * 
 * 
 */
router.get("/:userid/dashboard", async function(req, res, next){
  const userid = parseInt(req.params.userid)
  try{
    const apps = await SteamApp.getDashboardApps(userid)
    return res.json({apps})
  }catch(e){
    return next(e)
  }
})
/**
 * 
 * 
 * POST - Get data from app and send to favorites table
 * 
 * 
 */


router.post("/news/:appid", async function (req, res, next){
  try{
    const appToAdd = await SteamApp.addAppToDashboard({...req.body});
    console.log(appToAdd)
    return res.json(appToAdd.data)
  } catch(e){
    return next(e)
  }
})

/** 
 * 
 * DELETE - removes app data from favorites table
 * 
 * 
 */
router.delete("/news/:appid", async function (req, res, next){
  try{
    await SteamApp.removeAppFromDashboard({...req.body});
    return res.json({deleted: req.body})
  } catch(e){
    return next(e)
  }
})

module.exports = router;