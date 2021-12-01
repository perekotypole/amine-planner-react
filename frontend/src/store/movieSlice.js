import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isSameMonth } from 'date-fns'

import MoviesService from '../services/movies.service'

const requestGetById = async (id, episodes = false) => {
  const promise = axios.post('https://api.myshows.me/v2/rpc/', {
    jsonrpc: '2.0',
    method: 'shows.GetById',
    params: {
      showId: id,
      withEpisodes: episodes,
    },
    id: 1,
  })

  const element = await Promise.resolve((await promise).data)

  const key = '1914a82a'
  const { imdbUrl } = element.result
  let poster = ''

  if (imdbUrl) {
    const imdbID = imdbUrl.split('/')[4]
    const promisePoster = axios.get(`http://omdbapi.com/?apikey=${key}&i=${imdbID}`)

    poster = await Promise.resolve((await promisePoster).data.Poster)
    if (!poster || poster === 'N/A') poster = element.result.image
  } else {
    poster = element.result.image
  }

  const result = {
    poster,
    ...element.result,
  }

  return result
}

const requestSearch = async (query) => {
  const promise = axios.post('https://api.myshows.me/v2/rpc/', {
    jsonrpc: '2.0',
    method: 'shows.Get',
    params: {
      search: {
        genre: 29,
        query,
      },
      page: 0,
      pageSize: 30,
    },
    id: 1,
  })

  const elements = await Promise.resolve((await promise).data)

  const { result } = elements
  return result
}

export const getSubscribes = createAsyncThunk(
  'movies/getSubscribes',
  async () => {
    const subscribesData = await MoviesService.getSubscribes()
    if (subscribesData.errors) return false

    if (subscribesData.result.list) {
      const subscribes = Promise.all(subscribesData.result.list
        .map(({ movieID }) => requestGetById(movieID)))
        .then((elements) => elements)
      return subscribes
    }

    return false
  },
)

export const getSchedule = createAsyncThunk(
  'movies/getSchedule',
  async (date = new Date()) => {
    const subscribesData = await MoviesService.getSubscribes()

    if (subscribesData.result.list) {
      const schedule = Promise.all(subscribesData.result.list
        .map(({ movieID }) => requestGetById(movieID, true)))
        .then((elements) => elements.map((element) => {
          const episodes = element.episodes.filter(
            (episode) => isSameMonth(date, new Date(episode.airDate)),
          )

          const result = episodes.map((episode) => ({
            ...episode,
            info: element,
          }))
          return result
        }))
      return schedule
    }

    return null
  },
)

export const getPlannerList = createAsyncThunk(
  'movies/getPlannerList',
  async (list) => {
    const plannerData = await MoviesService.getPlanner()
    if (plannerData.errors) return false

    const planner = await Promise.all(plannerData.result[list]
      .map(({ _id, movieID, text }) => {
        if (text) {
          return ({
            id: movieID || _id,
            title: text,
          })
        }

        return requestGetById(movieID)
      }))
      .then((elements) => elements)

    return [list, planner]
  },
)

export const getSearch = createAsyncThunk(
  'movies/getSearch',
  async (query) => {
    const search = []
    const { result: { list: subscribesData } } = await MoviesService.getSubscribes()

    if (query.length) {
      const searchResult = await requestSearch(query)

      const searchPromise = Promise.all(searchResult
        .map(({ id }) => requestGetById(id)))
        .then((elements) => {
          if (!subscribesData.length) return elements

          return (elements.map(
            (item) => {
              let checked = false
              subscribesData.forEach(({ movieID }) => { if (movieID === item.id) checked = true })

              return {
                checked,
                ...item,
              }
            },
          ))
        })
      search.push(...(await searchPromise))
    }

    return search
  },
)

export const addSubscribe = createAsyncThunk(
  'movies/addSubscribe',
  async (id) => {
    const itemExist = Promise(requestGetById(id))
    let result = false

    if (itemExist) {
      result = await MoviesService.addSubscribe(id)
    }

    if (result.errors) return false

    return { result }
  },
)

export const removeSubscribe = createAsyncThunk(
  'movies/removeSubscribe',
  async (id) => {
    const result = await MoviesService.addSubscribe(id) || false

    return { result }
  },
)

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    subscribes: [],
    schedule: [],
    search: [],
    searchStatus: null,
    planner: {
      completed: [],
      dropped: [],
      onHold: [],
      plan: [],
      watching: [],
    },
  },
  extraReducers: {
    [getSubscribes.fulfilled]: (state, action) => {
      state.subscribes = []
      if (action.payload) state.subscribes.push(...(action.payload))
    },
    [getSchedule.fulfilled]: (state, action) => {
      state.schedule = []
      if (action.payload) state.schedule.push(...(action.payload.flat()))
    },
    [getSearch.fulfilled]: (state, action) => {
      state.searchStatus = ''
      state.search = []
      if (action.payload) state.search.push(...(action.payload))
    },
    [getSearch.pending]: (state) => {
      state.searchStatus = 'Loading'
    },
    [getPlannerList.fulfilled]: (state, action) => {
      const [list, result] = action.payload
      state.planner[list] = []
      if (action.payload) state.planner[list].push(...result)
    },
  },
  reducers: {
    updatePlannerData(state, action) {
      const {
        sourceList,
        destinationList,
        removedElementIndex,
        addedElementIndex,
      } = action.payload

      const element = state.planner[sourceList][removedElementIndex]

      state.planner[sourceList].splice(removedElementIndex, 1) // remove
      state.planner[destinationList].splice(addedElementIndex, 0, element) // add
    },
  },
})

export const { updatePlannerData } = movieSlice.actions

export default movieSlice.reducer
