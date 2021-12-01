/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import Cookies from 'universal-cookie'
import AuthService from './auth.service'

const cookies = new Cookies()
const baseUrl = new URL(global.window.origin)
const API_URL = `${baseUrl.protocol}//${baseUrl.hostname}:4000/`

const instance = axios.create({
  baseURL: API_URL,
})

instance.interceptors.request.use(
  (config) => {
    const tokens = cookies.get('tokens') || localStorage.getItem('tokens')

    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config

    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true

      try {
        const tokens = await AuthService.refresh()

        if (tokens.result) return instance(originalConfig)
      } catch (_error) {
        return Promise.reject(_error)
      }
    }

    return Promise.reject(err)
  },
)

export default instance
