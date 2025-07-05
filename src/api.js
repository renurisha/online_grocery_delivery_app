import axios from "axios";

const BASE_URL = "http://localhost:8000"; // your local API base URL
// http://localhost:8000/api/v1/items/?skip=0&limit=100
export const getAllItems = () => {
  return axios.get(`${BASE_URL}/api/v1/items/?skip=0&limit=100`);
};

export const getCategoryById = (params) => {
  return axios.post(`${BASE_URL}/api/v1/categories/`, {
    params: params, // query params go here
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItemDetails = (id) => {
  return axios.get(`${BASE_URL}/api/v1/items/${id}`);
};

// export const getCategoryById = (params, body) => {
//   return axios.post(`${BASE_URL}/api/v1/categories/`, body, {
//     params: params, // query params go here
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
