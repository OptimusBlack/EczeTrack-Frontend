const BASE_URL = "http://10.0.2.2:3000/v1/";

const getApiUrl = (path)=>{
    return BASE_URL + path;
};

let request = async (url, data) => {
    const config = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    
    };
    try{
        const response = await fetch(url, config);
        console.log("Got response...")
        const responseJson = await response.json();
        return responseJson;
    
    }
    catch(error) {
        console.error('Error in fetching data',url);
        console.warn(config);
        console.warn(error);
    }
}


const login = async (email, password) => {
    const path = "auth/login";
    return await request(getApiUrl(path), {email, password});
};

const register = async (name, email, password) => {
    const path = "auth/register";
    return await request(getApiUrl(path), {name, email, password});
};

export {
    login,
    register
}