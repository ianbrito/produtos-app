import axios from "axios";

const configs = {
  baseURL: process.env.NEXT_API_URL
}

export const api = axios.create(configs);
