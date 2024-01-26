import axios from 'axios';
import {expirationToken} from "../../utils/util";

const baseURL = process.env.REACT_APP_BASE_URL;

class ApiResource {
    constructor(apiurl){
        this.apiurl = apiurl;
    }   
    
    getConfig(){
        return {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
            }
        }
    }
    

    post(resource, body){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["post"](requestUrl, body, this.getConfig());
    }

    postUsuarioCadastro(resource, body){
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["post"](requestUrl, body);
    }
    
    put(resource, body){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["put"](requestUrl, body, this.getConfig());
    }
    
    delete(resource){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["delete"](requestUrl, this.getConfig());
    }
    
    get(resource,param){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}${param}`;
        return axios["get"](requestUrl, this.getConfig());
    }

    logar(body){
        const configLogin = {
            headers: {
                'Authorization': 'Basic c3RhcnRlci1wYWNrYWdlQDIwMjM6c3RhcnRlci1wYWNrYWdlQDIwMjM=',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const requestUrl = `${baseURL}/oauth/token`;
        return axios["post"](requestUrl, body, configLogin);
    }
}


export default ApiResource;
