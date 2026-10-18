/**@abstract
 * Axios HTTP Client
 * Copyriht (c) 2026 Sopandi Ahmad
 * 
 */
import axios from 'axios';

const API_URL = 'http://localhost:5232/api';

// Buat instance axios dengan alamat backend .NET Core Anda
const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Request Interceptor: Otomatis selipkan token JWT dari localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token'); // Ambil token saat login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Otomatis tendang ke halaman login jika token expired/401

/*****************************************************************
  Kondisi jika Service Backend Belum Nyala(Network Unpluged, WiFi Off)
  const je = error.toJSON();
  1. Jika server belum nyala
     message     : Network Error
     code        : ERR_NETWORK
     status      : undefined

  2. Jika login salah user/password
     message     : Network Error
     code        : ERR_NETWORK
     status      : undefined

  Kondisi jika Service Backend Sudah Hidup
  3. Jika login salah user/password
     status     : 401
     statusText : "Unauthorized"

*****************************************************************/
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response){
        /******************************************************
        {
          config		: {transitional: {…},
          data		  : {message: 'Username atau password salah!'},
          fileName	: undefined,
          headers		: AxiosHeaders$1 {content-type:,
          request		: XMLHttpRequest {onreadystatechange,
          statusText: "Unautorized",
          status		: 401
        }
        *******************************************************/      
        localStorage.removeItem('jwt_token');
        if(error.response.status === 401) {
          //console.log(error.response);
          // //window.location.href = '#/forms/login';
        }else {
          //
        } 
        //console.log(error.response);
        return Promise.reject(error);
    } else {
      const je = error.toJSON();
      const respon = { "status": -1, "statusText":je.stack};
      /*******************************************************
      {
        code		    : "ERR_NETWORK",
        columnNumber: undefined,
        config		  : {transitional: {…},
        description	: undefined,
        fileName	  : undefined,
        lineNumber	: undefined,
        message		  : "Network Error",
        name		    : "AxiosError",
        number		  : undefined,
        stack		    : "AxiosError: Network Error",
        status		  : undefined
      }
      *******************************************************/      
      //console.log(je);
      return Promise.reject(respon);
    }
  }
);

export default api;