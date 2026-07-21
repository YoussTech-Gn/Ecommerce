import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 5000,
  //   headers: {
  //     Authorization: "Bearer YOUR_TOKEN_HERE",
  //   },
});

export { apiClient };
