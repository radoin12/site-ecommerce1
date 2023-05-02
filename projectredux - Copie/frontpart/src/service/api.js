// import axios from 'axios';
// import AuthService from'./authservice'
// import decode from'jwt-decode'
// const refreshTokenEndpoint = 'http://localhost:3000/refreshToken';
// let accessToken = (AuthService.getCurrentUser());










// // Function to refresh the access token using the refresh token
// async function refreshAccessToken() {
//     const refreshToken=decode(accessToken?.refreshToken)
//   try {
//     const response = await axios.post(refreshTokenEndpoint, {
//       token: refreshToken
//     });
//     accessToken = response.data.access_token;
//     const { session } = response.data;
//     if (session?.accessToken) {
//         localStorage.setItem("token", JSON.stringify(session));
//     }
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// // Axios interceptor to handle expired tokens
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       return refreshAccessToken().then(() => {
//         const access=decode(accessToken?.accessToken)
//         originalRequest.headers.Authorization = `Bearer ${access}`;
//         return axios(originalRequest);
//       });
//     }

//     return Promise.reject(error);
//   }
// );
// export const axiosPublic=axios