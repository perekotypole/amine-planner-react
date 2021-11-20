import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './movieSlice'
import authorizationSlice from './authorizationSlice'

export default configureStore({
  reducer: {
    movies: movieReducer,
    authorization: authorizationSlice,
  },
})
