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

    if (subscribesData.result.list) {
      const subscribes = Promise.all(subscribesData.result.list
        .map(({ movieID }) => requestGetById(movieID)))
        .then((elements) => elements)
      return subscribes
    }

    return null
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
    const { result: plannerData } = await MoviesService.getPlanner()

    const planner = await Promise.all(plannerData[list]
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
    const subscribesData = await MoviesService.getSubscribes()

    if (query.length) {
      const searchResult = await requestSearch(query)

      if (subscribesData.result.list) {
        const searchPromise = Promise.all(searchResult.result.list
          .map(({ movieID }) => requestGetById(movieID)))
          .then((elements) => elements.map(
            (item) => {
              let checked = false
              subscribesData.forEach(({ id }) => { if (id === item.id) checked = true })

              return {
                checked,
                ...item,
              }
            },
          ))
        search.push(...(await searchPromise))
      } else {
        search.push(...(await searchResult))
      }
    }

    return search
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
      state.subscribes.push(...(action.payload))
    },
    [getSchedule.fulfilled]: (state, action) => {
      state.schedule = []
      state.schedule.push(...(action.payload.flat()))
    },
    [getSearch.fulfilled]: (state, action) => {
      state.searchStatus = ''
      state.search = []
      state.search.push(...(action.payload))
    },
    [getSearch.pending]: (state) => {
      state.searchStatus = 'Loading'
    },
    [getPlannerList.fulfilled]: (state, action) => {
      const [list, result] = action.payload
      state.planner[list] = []
      state.planner[list].push(...result)
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
