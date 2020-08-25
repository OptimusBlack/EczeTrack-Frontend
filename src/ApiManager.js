import Constants from 'expo-constants';

const BACKEND_HOST = 'localhost';
let BASE_URL;

if(BACKEND_HOST === 'heroku')
  BASE_URL = "http://eczetrack.herokuapp.com/v1/";
else if(Constants.platform.ios)
  BASE_URL = "http://localhost:3000/v1/";
else
  BASE_URL = "http://10.0.2.2:3000/v1/";


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
    return await response.json();
  }
  catch(error) {
    console.error('Error in fetching data',url);
    console.warn(config);
    console.warn(error);
  }
};


const login = async (email, password) => {
  const path = "auth/login";
  return await request(getApiUrl(path), {email, password});
};

const register = async (name, email, password) => {
  const path = "auth/register";
  return await request(getApiUrl(path), {name, email, password});
};

const forgotPassword = async (email) => {
  const path = "auth/forgot-password";
  return await request(getApiUrl(path), {email});
};

const resetPassword = async (token, password) => {
  const path = `auth/reset-password/?token=${token}`;
  return await request(getApiUrl(path), {password});
};

const refreshToken = async (refreshToken) => {
  const path = `auth/refresh-tokens`;
  return await request(getApiUrl(path), {refreshToken});
};

export {
  login,
  register,
  forgotPassword,
  resetPassword,
  refreshToken
}