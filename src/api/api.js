import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000"
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://steam-capstone.onrender.com"



class SteamDbApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {Authorization: `Bearer ${SteamDbApi.token}`};
    const params = (method === "get")
      ? data
      : {};

    try{
      return(await axios ({ url, method, data, params, headers })).data;
    } catch(e){
      console.error("API Error:", e.response);
      let msg = e.response.data.error.msg;
      throw Array.isArray(msg) ? msg : [msg];
    }
  }

  /**
   * Individual routes
   */

  static async getCurrentUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async login(data){
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  static async signup(data){
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async update(username, data){
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async getAppNames(searchTerm){
    let res = await this.request("steamApps/search", {searchTerm})
    return res;
  }

  static async getAppDetails(appid){
    let res = await this.request(`steamApps/${appid}`)
    return res;
  }

  static async getFavoritedApps() {
    let res = await this.request(`steamApps/`);
    return res;
  }

  static async getAppNews(appid){
    let res = await this.request(`steamApps/news/${appid}`)
    return res;
  }

  static async addAppToDash(appid, data){
    let res = await this.request(`steamApps/news/${appid}`, data, "post")
    return res;
  }

  static async removeAppFromDash(appid, data){
    let res = await this.request(`steamApps/news/${appid}`, data, "delete")
    return res;
  }

  static async getDashboardApps(userid){
    let res = await this.request(`steamApps/${userid}/dashboard`)
    return res;
  }
}

export default SteamDbApi;