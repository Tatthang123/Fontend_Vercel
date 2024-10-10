import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";
// console.log('GOOGLE_CLIENT_ID', process.env)
const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const API_KEY =
  "348f099c3d38f205a8e6391839920cb6c0761b628b0e060caf91bc4f28a94e9da953aa642b562c04987c2bbdd7dcfeaf5c5e893334d9313ba55736093d332d9b";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;
console.log(REACT_APP_DEV_API);

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  // withCredentials: true
});

// Handle request API
// API.interceptors.request.use(req => {
//   if (localStorage.getItem('userId')) {
//     req.headers[HEADER.CLIENT_ID] = ` ${
//       JSON.parse(localStorage.getItem('userId')).userId
//     }`
//   }

//   if (localStorage.getItem('accessToken')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(
//       localStorage.getItem('accessToken')
//     )}`
//   }

//   req.headers['x-api-key'] = API_KEY

//   return req
// })

// API create code
export const generateCode = (input) =>
  API.post("api/anthropic/generate", { input });

// API Auth
export const login = (formData) => API.post("api/v1/auth/login", formData);


// export const googleLogin = (email, googleId) =>
//   API.post("/v1/api/user/googleLogin", { email, googleId });
// export const register = (formData) =>
//   API.post("/v1/api/user/register", formData);
// export const logout = () => API.post("/v1/api/user/logout");
// export const refreshToken = () => API.post("/v1/api/user/refreshToken");
