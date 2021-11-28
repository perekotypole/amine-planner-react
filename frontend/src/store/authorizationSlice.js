import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import AuthService from '../services/auth.service'
import UserService from '../services/user.service'

const tokens = JSON.parse(localStorage.getItem('tokens'))

export const setRegistration = createAsyncThunk(
  'authorization/setRegistration',
  async ({ username, email, password }) => {
    try {
      const response = await AuthService.register(username, email, password)
      return response.data
    } catch (error) {
      return null
    }
  },
)
export const setLogin = createAsyncThunk(
  'authorization/setLogin',
  async ({ username, password }) => {
    try {
      const response = await AuthService.login(username, password)

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
      let response = await UserService.getUser()

      if (response.accessTokenExpired) {
        await AuthService.refresh()
        response = await UserService.getUser()
      }

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
      let response = null
      let result = null
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!user) {
        response = await UserService.updateUser(user)

        if (response.accessTokenExpired) {
          await AuthService.refresh()
          response = await UserService.updateUser(user)
        }

        result = await UserService.getUser()
      }

      return result.result
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
  initialState,
  extraReducers: {
    [setUser.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [setUser.rejected]: (state) => {
      state.isLoggedIn = true
      state.user = null
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [setRegistration.fulfilled]: (state) => {
      state.isLoggedIn = true
    },
    [setRegistration.rejected]: (state) => {
      state.isLoggedIn = true
      state.user = null
    },
    [setLogin.fulfilled]: (state) => {
      state.isLoggedIn = true
    },
    [setLogin.rejected]: (state) => {
      state.isLoggedIn = true
      state.user = null
    },
    [setLogout.fulfilled]: (state) => {
      state.isLoggedIn = false
      state.user = null
    },
  },
})

export default authorizationSlice.reducer
