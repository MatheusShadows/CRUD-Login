import { parseCookies } from "nookies";
import axios from "axios";

const { 'nextauth.token' : token } = parseCookies()
export const api = axios.create({
    baseURL: 'http://192.168.1.60:3014/contratos',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  })

if (token){
  api.defaults.headers['Authorization']= 'Bearer ${token}'
}
