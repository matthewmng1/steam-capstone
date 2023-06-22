"use strict";

const axios = require("axios");
const db = require("../db");
const BASE_URL= `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=`
const apiKey = 'F78CB393368CB4B7377EBC9D82E8A9AF'

class SteamApp {

  /**
   * 
   * 
   * Populates steam database with steamapi data
   * 
   * 
   * 
   */
  static async updateSteamDatabase(){
    try {
      await db.query(`DELETE FROM steam;`)
      const res = await axios.get(BASE_URL + `${apiKey}&l=english`)
      const data = res.data.response.apps
      for(let info of data){
        let appid = info.appid
        let name = info.name
        await db.query(`
          INSERT INTO steam
            (appid, name)
          VALUES ($1, $2)
          RETURNING appid, name`,
          [
            appid,
            name
          ],
        );
      }
      return data
    } catch(e){
      throw new Error(e)
    }
  }

  /**
   * 
   *  
   * gets all apps from steam database
   * 
   * 
   * 
   */

  static async getAllApps(){
    const res = await db.query(`
        SELECT appid, name
        FROM steam
    `)
    return res.rows;
  }

  /**
   * 
   * 
   * Searches by name, gets all apps from steam database
   * 
   * 
   */
  static async getByName(searchFor){
    const res = await db.query(`
        SELECT appid, name
        FROM steam
        WHERE name ILIKE '%' || $1 || '%'`
      ,[searchFor])

    return res.rows;
  }

  /**
   * 
   * 
   * Gets details about an app using appid
   * 
   * 
   */
  static async getAppDetails(appid){
    const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=english`
    try{
      const getResults = await axios.get(url)
      const res = getResults.data[`${appid}`].data
      const {
        name, 
        steam_appid, 
        short_description,
        header_image, 
        "capsule_image": imageUrl,
        "background_raw": backgroundImageUrl,
        developers 
      } = res;
      const data = {name, steam_appid, short_description, header_image, imageUrl, backgroundImageUrl, developers}
      return data 
    }catch(e){
      throw new Error(e)
    }
  }

  /**
   * 
   * 
   * Gets news about app from api using appid
   *  
   */
  static async getAppNews(appid){
    const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appid}&count=3&maxlength=300&format=json&l=english`
    try{
      const response = await axios.get(url)
      const data = response.data.appnews.newsitems
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * 
   * Checks favorites database 
   *
   * 
   * 
  */

  static async checkFavorites() {
    const result = await db.query(`
        SELECT appid, userid
        FROM favorites
        ORDER BY userid;`
      );
    return result.rows;
  }

  /**
   * 
   * 
   * Gets user apps for dashboar using userid
   * 
   * 
   */
  static async getDashboardApps(userid){
    const result = await db.query(`
        SELECT appid, userid, name, url, backgroundImageUrl
        FROM favorites
        WHERE userid = $1`,
      [userid])
    const dashboardApps = result.rows;
    console.log(dashboardApps)
    return dashboardApps;
  }

  /**
   * 
   * 
   * Add apps to dashboard - saves appid, useris, name, url, backgroundimageurl
   * 
   * 
   */

  static async addAppToDashboard({
    appid, userid, name, url, backgroundImageUrl}){
      const result = await db.query(`
          INSERT INTO favorites
            (appid, userid, name, url, backgroundImageUrl)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING appid, userid`,
          [
            appid,
            userid,
            name,
            url,
            backgroundImageUrl
          ],
      );
      const favoriteApp = result.rows[0]
      return favoriteApp
    }

    /**
     * 
     *
     * removes an app from user dashboard
     * 
     * 
     */
    static async removeAppFromDashboard({
      appid, userid}){
        let result = await db.query(`
            DELETE
            FROM favorites
            WHERE appid = $1 
            AND userid = $2
            RETURNING appid`
        , [appid, userid])
        const rowToRemove = result.rows[0]
      }
}

module.exports = SteamApp;

