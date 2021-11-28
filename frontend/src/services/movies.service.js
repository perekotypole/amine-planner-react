import axios from 'axios'
import authHeader from './auth-header'

const baseUrl = new URL(global.window.origin)
const API_URL = `${baseUrl.protocol}//${baseUrl.hostname}:4000/`

const getSubscribes = () => axios
  .post(`${API_URL}subscribes/get`, null, { headers: authHeader() })
  .then((response) => response.data)

const getPlanner = () => axios
  .post(`${API_URL}planner/get`, null, { headers: authHeader() })
  .then((response) => response.data)

const moviesService = {
  getSubscribes,
  getPlanner,
}

export default moviesService
