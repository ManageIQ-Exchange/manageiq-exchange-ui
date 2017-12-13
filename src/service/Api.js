import axios from 'axios';
import config from '../config';
import { LogError } from './Log';

//Server Backend
const BackendServer = process.env.GALAXY_API_BACKEND
//Version of API
const Version       = process.env.GALAXY_API_VERSION
//Root API Base
const ApiBaseURL    = `${ BackendServer }/${ Version }`

// Api Version
const ApiVersion =`${ BackendServer }/api/version`

//Users
const ApiSignin   = `${ ApiBaseURL }/users/sign_in`  /* User Log in */
const ApiSignout  = `${ ApiBaseURL }/users/sign_out`  /* User Log out */
const ApiGetUsers = `${ ApiBaseURL }/users`  /* List of Users*/
const ApiGetUser  =  `${ ApiBaseURL }/users/` /* Get a specific user  adding id or username in path*/ 

//GIT
const GetUserStats = `https://api.github.com/users/` /* Get a specific user stats in GIT  adding id or username in path*/ 

//Spins
const ApiRefreshSpin = `${ ApiBaseURL}/spins/refresh?`  /* Refresh Spins */

class Api{

    headerSignIn(code){
        return { code: code } 
    }
    headerAuthenticated(){
        return {
            'X-USER-ID' : sessionStorage.getItem('authentication_token'),
            'X-USER-TOKEN' : sessionStorage.getItem('github_id')
        }
    }

    static version(){
        const api = new this();
        api.request('get', ApiVersion)  
        return api       
    }

    static SignIn(code){
        const api = new this();
        api.request('post', ApiSignin, api.headerSignIn(code)) 
        return api
    }
    static SignOut(){
        const api = new this();
        api.request('delete', ApiSignout, api.headerAuthenticated()) 
        return api
    }

    static GetUsers(){
        const api = new this();
        api.request('get', ApiGetUsers) 
        return api
    }
    static GetUser(id_or_username){
        const api = new this();
        api.request('get', ApiGetUser + id_or_username) 
        return api
    }
    static GitUserStats(id_or_username){
        const api = new this();
        api.request('get', GetUserStats + id_or_username) 
        return api
    }


    static RefreshSpin(){
        const api = new this();
        api.request('post', ApiRefreshSpin, api.headerAuthenticated()) 
        return api
    }

    request(method,url,headers = {},params = {},data = {}){
        this.promise = new Promise((resolve, reject) => {           
        // GET request for remote image
            axios({
                method:method,
                url:url,
                data:data,
                headers:headers,
                params:params,
            })
            .then(response => {
                //LogError("Test")
                resolve(response);
                return;
            })
            .catch(error => {
                this.showError(error)
                reject(new Error(error));
                //ErrorApiControl(error)
                return;
            }); 
        });
    }    

    showError(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(`[${error.response.status}] ${error.response.statusText}`)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(`Request send but not response: ${error}`);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(`Error in Request: ${error.message}`);
          }
          console.error(`[${error.config.method}][${error.config.url}]${error}`)
    }

    then(...args) {
        return this.promise.then(...args);
    }

    catch(...args) {
        return this.promise.then(...args);
    }
}

export default Api;