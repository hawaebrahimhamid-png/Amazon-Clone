import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "http://127.0.0.1:5001/clone-c34b5/us-central1/api",
  //   deployment on renderMatches.com
  baseURL: "https://amazon-api-deploy-1hl1.onrender.com",
});

export default axiosInstance;
