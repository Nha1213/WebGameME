// import config from "./config";
// import axios from "axios";

// export const request = (url = "", method = "", data = {}) => {
//   var headers = { "Content-Type": "application/json" };
//   if (data instanceof FormData) {
//     headers = { "Content-Type": "multipart/form-data" };
//   }
//   // const access_token = GetAccessToken();
//   return axios({
//     url: config.base_url + url,
//     method: method,
//     data: data,
//     headers: {
//       ...headers,
//       // Accept: "application/json",
//       // "Content-Type": "application/json",
//       // "Cache-Control": " no-cache",
//       Pragma: "no-cache",
//       // Authorization: "Bearer " + access_token,
//     },
//   });
// };

import config from "./config";
import axios from "axios";

export const request = (url = "", method = "", data = {}) => {
  var headers = { "Content-Type": "application/json" };
  if (data instanceof FormData) {
    headers = { "Content-Type": "multipart/form-data" };
  }
  return axios({
    url: config.base_url + url,
    method: method,
    data: data,
    headers: {
      ...headers,
      Accept: "application/json",
      Pragma: "no-cache",
    },
  });
};
