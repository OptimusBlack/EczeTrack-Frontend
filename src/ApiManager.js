const BASE_URL = "http://localhost:3000/v1/";

const getApiUrl = (path)=>{
    return BASE_URL + path;
};

let request = async (url, data) => {
    const config = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    
    };
    try{
        const response = await fetch(url, config);
        const responseJson = await response.json();
        if(responseJson.status !== 200){
            console.log('Requesting Error:', url, config)
            console.log('Response', responseJson)
        }
        return responseJson;
    
    }
    catch(error) {
        console.error('Error in fetching data',url);
        console.warn(config);
        console.warn(error);
    }
}


const login = async (name, email, password) => {
    const path = "auth/register";
    let response = await request(getApiUrl(path), {name, email, password});
    return response;
};

const register = async (name, email, password) => {
    const path = "auth/register";
    let response = await request(getApiUrl(path), {name, email, password});
    return response;
};

export default {
    login,
    register
}