//Setup axios http requests
import axios from "axios";
let instanceConfig;

instanceConfig = axios.create({
  baseURL: process.env.REACT_APP_API + "/api/",
  timeout: 20000,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

const instance = instanceConfig;
export default instance;
