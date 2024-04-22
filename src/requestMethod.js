import axios from "axios";

const BASE_URL = "https://task-management-backend-gmyf.vercel.app//api";


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user)?.currentUser;
const TOKEN = currentUser && currentUser.accesTocken;
console.log(TOKEN);


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
}
);

