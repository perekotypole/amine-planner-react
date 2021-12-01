import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const API_URL = 'http://localhost:4000/'

const register = (username, email, password, term = true) => axios
  .post(`${API_URL}signUp`, {
    username,
    email,
    password,
  }).then((response) => {
    if (response.data.result.access) {
      const tokens = JSON.stringify(response.data.result)

      if (term) cookies.set('tokens', tokens)
      else localStorage.set('tokens', tokens)
    }

    return response.data
  })

const login = (username, password, term = true) => axios
  .post(`${API_URL}signIn`, {
    username,
    password,
  })
  .then((response) => {
    if (response.data.result.access) {
      const tokens = JSON.stringify(response.data.result)

      if (term) cookies.set('tokens', tokens)
      else localStorage.set('tokens', tokens)
    }

    return response.data
  })

const refresh = (term = true) => axios
  .post(`${API_URL}refresh`, {
    token: cookies.get('tokens').refresh || localStorage.getItem('tokens').refresh,
  })
  .then((response) => {
    if (response.data.result.access) {
      const tokens = JSON.stringify(response.data.result)

      if (term) cookies.set('tokens', tokens)
      else localStorage.set('tokens', tokens)
    }

    return response.data
  })

const logout = () => {
  cookies.remove('tokens')
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
