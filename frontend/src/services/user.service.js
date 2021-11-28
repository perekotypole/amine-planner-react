import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:4000/'

const getUser = () => axios
  .post(`${API_URL}user/get`, null, { headers: authHeader() })
  .then((response) => response.data)

const updateUser = ({
  username,
  status,
  mainPhoto,
  banner,
}) => axios
  .post(`${API_URL}user/update`, {
    username,
    status,
    mainPhoto,
    banner,
  }, { headers: authHeader() })
  .then((response) => response.data)

const userService = {
  getUser,
  updateUser,
}

export default userService
