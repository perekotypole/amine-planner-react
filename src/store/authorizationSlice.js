import { createSlice } from '@reduxjs/toolkit'
import md5 from 'MD5'

import banner from '../assets/images/banner.jpg'
import mainPhoto from '../assets/images/nobara.jpg'

const usersList = [
  {
    userID: '1',
    username: 'Perekotypole',
    status: 'Дуже умний статус',
    email: 'perekotypole@gmail.com',
    banner,
    mainPhoto,
    password: '5f4dcc3b5aa765d61d8327deb882cf99',
  },
]

const authorizationSlice = createSlice({
  name: 'movies',
  initialState: {
    userID: null,
    token: '',
    user: {
      username: '',
      status: '',
      email: '',
      banner: '',
      mainPhoto: '',
    },
  },
  reducers: {
    setLogin(state, action) {
      const {
        username,
        password,
      } = action.payload

      const hashPassword = md5(password)
      const userArray = usersList.filter((element) => (
        element.username?.toLowerCase() === username?.toLowerCase()
        && element.password === hashPassword.toString()
      ))

      if (userArray[0]) {
        const user = userArray[0]

        state.userID = user.userID

        state.user.username = user.username
        state.user.status = user.status
        state.user.email = user.email
        state.user.mainPhoto = user.mainPhoto
        state.user.banner = user.banner

        state.token = 'testToken'
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    setRegistration(state, action) {
      const {
        username,
        email,
        password,
      } = action.payload

      const hashPassword = md5(password)
      const user = {
        userID: usersList.length + 1,
        username,
        email,
        password: hashPassword,
        status: 'Дуже умний статус',
        banner,
        mainPhoto,
      }

      usersList.push(user)

      state.userID = user.userID

      state.user.username = user.username
      state.user.status = user.status
      state.user.email = user.email
      state.user.mainPhoto = user.mainPhoto
      state.user.banner = user.banner

      state.token = 'testToken'
      localStorage.setItem('user', JSON.stringify(user))
    },
    setUser(state, action) {
      const user = action.payload

      state.userID = user.userID
      state.user = {
        ...state.user,
        ...user,
      }
    },
  },
})

export const { setLogin, setUser, setRegistration } = authorizationSlice.actions
export const selectUserID = (state) => state.user.userID

export default authorizationSlice.reducer
