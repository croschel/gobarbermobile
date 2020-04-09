import axios from 'axios';

const api = axios.create({
  baseURL: "http:10.0.3.2:3333",
  // If I would be on my android phone I should use 192.168.0.20
})

export default api;