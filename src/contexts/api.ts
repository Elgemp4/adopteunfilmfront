import axios, { AxiosError } from "axios";

let token : string = "";

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

api.interceptors.response.use((response) => {
    const token = response.data.token;

    if(token != undefined){
        changeToken(token, false);
    }

    return response;
}, null)

api.interceptors.response.use(null, async (error: AxiosError) => {
    const requestConfig = error.config;
    if(requestConfig == undefined){
        return;
    }

    try{
        if(error.status == 401 && !requestConfig.url?.includes("retry")){

            const result = await api.post("/renew")
            if(result == undefined){
                document.location = "/login";
                return;
            }

            if(result.status == 200){
                requestConfig.headers.Authorization = `Bearer ${token}`;
                requestConfig.url = `${requestConfig.url}?retry`
                return api(requestConfig);
            }
        }    
    }
    catch(_){
    }
    
});




export default api;