import axios from 'axios'

const API_URL = 'http://localhost:4000/'

const register = (username, email, password) => axios
  .post(`${API_URL}signUp`, {
    username,
    email,
    password,
  }).then((response) => {
    if (response.data.result.access) {
      localStorage.setItem('tokens', JSON.stringify(response.data.result))
    }

    return response.data
  })

const login = (username, password) => axios
  .post(`${API_URL}signIn`, {
    username,
    password,
  })
  .then((response) => {
    if (response.data.result.access) {
      localStorage.setItem('tokens', JSON.stringify(response.data.result))
    }

    return response.data
  })

const refresh = () => axios
  .post(`${API_URL}refresh`, {
    token: JSON.parse(localStorage.getItem('tokens')).refresh,
  })
  .then((response) => {
    if (response.data.result.access) {
      localStorage.setItem('tokens', JSON.stringify(response.data.result))
    }

    return response.data
  })

const logout = () => {
  localStorage.removeItem('tokens')
  return axios.post(`${API_URL}logOut`)
}

const authService = {
  register,
  login,
  logout,
  refresh,
}

export default authService
