import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

import AuthService from '../services/auth.service'
import UserService from '../services/user.service'

const cookies = new Cookies()
const tokens = cookies.get('tokens') || JSON.parse(localStorage.getItem('tokens'))

export const setRegistration = createAsyncThunk(
  'authorization/setRegistration',
  async ({
    username, email, password, terminateLogin,
  }) => {
    try {
      const response = await AuthService.register(username, email, password, terminateLogin)
      if (response.errors) return false

      return response.data
    } catch (error) {
      return null
    }
  },
)
export const setLogin = createAsyncThunk(
  'authorization/setLogin',
  async ({ username, password, terminateLogin }) => {
    try {
      const response = await AuthService.login(username, password, terminateLogin)
      if (response.errors) return false

      return response.result
    } catch (error) {
      return null
    }
  },
)

export const setLogout = createAsyncThunk('authorization/setLogout', async () => {
  await AuthService.logout()
})

export const setUser = createAsyncThunk(
  'authorization/setUser',
  async () => {
    try {
      const response = await UserService.getUser()
      if (response.errors) return false

      return response.result
    } catch (error) {
      return null
    }
  },
)

export const updateUser = createAsyncThunk(
  'authorization/updateUser',
  async (user) => {
    try {
      if (Object.keys(user).length) {
        const response = await UserService.updateUser(user)
        if (response.errors) return false

        return response.result
      }

      return false
    } catch (error) {
      return null
    }
  },
)

const initialState = tokens && tokens.refresh && tokens.access
  ? { isLoggedIn: true }
  : { isLoggedIn: false }

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    loadingUser: false,
    user: {},
    ...initialState,
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => {
      state.user = action.payload
      if (action.payload) state.loadingUser = false
    },
    [setUser.pending]: (state, action) => {
      if (action.payload) state.user = action.payload
      state.loadingUser = true
    },
    [setUser.rejected]: (state) => {
      state.isLoggedIn = false
      state.loadingUser = false
      state.user = {}
    },
    [updateUser.fulfilled]: (state, action) => {
      if (action.payload) state.user = action.payload
    },
    [setRegistration.fulfilled]: (state, action) => {
      if (action.payload) state.isLoggedIn = true
    },
    [setRegistration.rejected]: (state) => {
      state.isLoggedIn = false
      state.user = {}
    },
    [setLogin.fulfilled]: (state, action) => {
      if (action.payload) state.isLoggedIn = true
    },
    [setLogin.rejected]: (state) => {
      state.isLoggedIn = false
      state.user = {}
    },
    [setLogout.fulfilled]: (state) => {
      state.isLoggedIn = false
      state.user = {}
    },
  },
})

export default authorizationSlice.reducer
