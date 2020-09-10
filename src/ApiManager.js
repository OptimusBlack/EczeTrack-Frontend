import Constants from 'expo-constants';
import {AsyncStorage, BackHandler} from 'react-native'

// const BACKEND_HOST = 'heroku';
const BACKEND_HOST = 'local';

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
    alert("Network Error! Cannot connect to server");
    BackHandler.exitApp();
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

const record = async (data, recordModel) => {
  const path = `record`;
  let user = await AsyncStorage.getItem('user', false);
  if(user) {
    user = JSON.parse(user);
    return await request(getApiUrl(path), {data, userId: user.user.id, recordModel});
  }
  else
    return null;
};

const checkWeekly = async () => {
  const path = `record/check-weekly`;
  let user = await AsyncStorage.getItem('user', false);
  if(user) {
    user = JSON.parse(user);
    return await request(getApiUrl(path), {userId: user.user.id});
  }
  else
    return null;
};

const checkDaily = async () => {
  const path = `record/check-daily`;
  let user = await AsyncStorage.getItem('user', false);
  if(user) {
    user = JSON.parse(user);
    return await request(getApiUrl(path), {userId: user.user.id});
  }
  else
    return null;
};

const checkOneTime = async () => {
  const path = `record/check-onetime`;
  let user = await AsyncStorage.getItem('user', false);
  if(user) {
    user = JSON.parse(user);
    return await request(getApiUrl(path), {userId: user.user.id});
  }
  else
    return null;
};


const getFoodList = async () => {
  const path = '/get/food-list';
  let res = await request(getApiUrl(path));
  return res.data;
};

const getChartData = async (factor, dateFrom, dateTo = new Date()) => {
  const path = `get/chart-data`;
  let user = await AsyncStorage.getItem('user', false);

  if(user) {
    user = JSON.parse(user);
    return await request(getApiUrl(path), {
      userId: user.user.id,
      dateFrom, dateTo, factor
    });
  }
  else
    return null;
};

const getDaySymptoms = async () =>  {
  const path = `get/day-symptoms`;
  let user = await AsyncStorage.getItem('user', false);

  if(user) {
    user = JSON.parse(user);
    return await request(getApiUrl(path), { userId: user.user.id });
  }
  else
    return null;
};

const getDayDAS = async () =>  {
  const path = `get/day-das`;
  let user = await AsyncStorage.getItem('user', false);

  if(user) {
    user = JSON.parse(user);
    return await request(getApiUrl(path), { userId: user.user.id });
  }
  else
    return null;
};

export {
  login,
  register,
  forgotPassword,
  resetPassword,
  refreshToken,
  record,
  checkWeekly,
  checkDaily,
  checkOneTime,
  getChartData,
  getFoodList,
  getDaySymptoms,
  getDayDAS
}