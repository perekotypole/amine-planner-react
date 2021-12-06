import axios from './auth-axios'

const getSubscribes = () => axios
  .post('subscribes/get')
  .then((response) => response.data)

const getPlanner = () => axios
  .post('planner/get')
  .then((response) => response.data)

const addSubscribe = (movieID) => axios
  .post('subscribes/add', { movieID })
  .then((response) => response.data)

const removeSubscribe = (movieID) => axios
  .post('subscribes/delete', { movieID })
  .then((response) => response.data)

const addToPlanner = (listName, movieID, movieTitle) => axios
  .post('planner/add', { listName, movieID, movieTitle })
  .then((response) => response.data)

const moviesService = {
  getSubscribes,
  getPlanner,
  addSubscribe,
  removeSubscribe,
  addToPlanner,
}

export default moviesService
