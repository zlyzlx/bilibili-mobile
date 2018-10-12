import axios from 'axios';
// import { Message } from 'element-ui';
import store from '../store';
import { getToken } from '@/fetch/auth';
import {isApp} from '@/fetch/util'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000                  // 请求超时时间
});

 // request拦截器
 service.interceptors.request.use(config => {
   if (getToken()) {
     config.headers['x-token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
   }
   return config;
 }, error => {
   // console.log(error); // for debug
   Promise.reject(error);
 })
//
// // respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
  // console.log(response.data)
    const res = response.data;

    return res;
  },
  error => {
    const response=error.response;
    let vm =this;
    if(response.data.result=="user is unAuthorization"){
      sessionStorage.clear()
    }
    return Promise.reject(error);
  }
)


export default service;
