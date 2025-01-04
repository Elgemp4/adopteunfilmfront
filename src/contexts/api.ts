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

export function changeToken(newToken: string){
    token = newToken
    localStorage.setItem("token", newToken);

    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export async function disconnect(){
    token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    
    await api.post("/logout");
}


const api = axios.create({
    baseURL: "http://localhost:3500",
    headers:{
        Authorization: `Bearer ${token}`
    },
    withCredentials: true
})

api.interceptors.response.use(
    (response) => {
        const token = response.data.token;

        if(token != undefined){
            changeToken(token);
        }

        return response;
    }, 
    async (error: AxiosError) => {
    const requestConfig = error.config;
    if(requestConfig == undefined){
        return;
    }
    

    if(error.status == 401 && !requestConfig.url?.includes("retry")){
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("Refresh token:", refreshToken);
        const result = await api.post("/renew", {token, refreshToken});
        if(result == undefined){
            throw error;
        }

        if(result.status == 200){
            requestConfig.headers.Authorization = `Bearer ${token}`;
            requestConfig.url = `${requestConfig.url}?retry`
            return api(requestConfig);
        }
    }    
});


export default api;