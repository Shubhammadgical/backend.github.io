import axios from "axios";

const baseURL = "https://warm-bastion-07300.herokuapp.com";

function get(url){
    return axios.get(baseURL + url);
}

function post(url,obj){
    return axios.post(baseURL + url, obj);
}

function putApi(url,obj){
    return axios.put(baseURL + url, obj);
}
function deleteApi(url,obj){
    return axios.delete(baseURL + url, obj);
}
export default {
    get,
    post,
    deleteApi,
    putApi,
};