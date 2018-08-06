import axios from "axios";
const baseUrl = "http://127.0.0.1:8888/api/private/v1/";
axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('myToken');
  config.headers['Authorization'] = token;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
export const checkLogin = params => {
  return axios.post("login", params).then(res => res.data)
}
export const getUserList = params => {
  return axios.get("users", params).then(res => res.data)
}