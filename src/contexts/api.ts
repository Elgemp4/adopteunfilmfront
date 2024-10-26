import axios from "axios";

let token = undefined;

const localToken = localStorage.getItem("token"); 
if(localToken != null){
    token = localToken
}

const sessionToken = sessionStorage.getItem("token");
if(sessionToken != null) {
    token = sessionToken;
}

export function changeToken(newToken: string, stayConnected: boolean){
    token = newToken
    
    if(stayConnected){
        localStorage.setItem("token", newToken);
        sessionStorage.removeItem("token");
    }
    else{
        sessionStorage.setItem("token", newToken) 
        localStorage.removeItem("token");   
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}


const api = axios.create({
    baseURL: "http://localhost:3500",
    headers:{
        Authorization: `Bearer ${token}`
    },
    withCredentials: true
})

api.interceptors.response.use(null, (error: any) => {
    console.log(error)
});




export default api;