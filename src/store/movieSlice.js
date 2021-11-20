import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { isSameMonth } from 'date-fns'

import plannerData from '../assets/data/plannerList'
import subscribesData from '../assets/data/subscribes'

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
    const subscribes = Promise.all(subscribesData.map(({ id }) => requestGetById(id)))
      .then((elements) => elements)
    return subscribes
  },
)

export const getSchedule = createAsyncThunk(
  'movies/getSchedule',
  async (date = new Date()) => {
    const schedule = Promise.all(subscribesData.map(({ id }) => requestGetById(id, true)))
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
  },
)

export const getPlannerList = createAsyncThunk(
  'movies/getPlannerList',
  async (list) => {
    const planner = await Promise.all(plannerData[list].map(({ id, text }) => {
      if (text) {
        return ({
          id,
          title: text,
        })
      }

      return requestGetById(id)
    }))
      .then((elements) => elements)

    return [list, planner]
  },
)

export const getSearch = createAsyncThunk(
  'movies/getSearch',
  async (query) => {
    const search = []

    if (query.length) {
      const searchResult = await requestSearch(query)
      const searchPromise = Promise.all(searchResult.map(({ id }) => requestGetById(id)))
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
      plans: [],
      watching: [],
      awaiting: [],
      finished: [],
      paused: [],
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
