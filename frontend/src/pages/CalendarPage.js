import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribes, getSearch } from '../store/movieSlice'
import '../assets/styles/pages/CalendarPage.scss'

import Calendar from '../components/calendar/Calendar'
import MovieCard from '../components/movies/MovieCard'
import MovieList from '../components/movies/MovieList'
import Input from '../components/Input'

const CalendarPage = () => {
  const myRef = useRef(null)

  const dispatch = useDispatch()
  let searchQuery = ''

  const movieList = useSelector((state) => state.movies.subscribes)
  const schedule = useSelector((state) => state.movies.schedule)
  const searchList = useSelector((state) => state.movies.search)
  const searchStatus = useSelector((state) => state.movies.searchStatus)

  useEffect(() => {
    dispatch(getSubscribes())
  }, [])

  const [past, setPast] = useState([])
  const [future, setFuture] = useState([])
  const scheduleList = [...schedule]

  useEffect(() => {
    if (scheduleList.length) {
      scheduleList.sort((first, second) => {
        const [firstDate, secondDate] = [new Date(first.airDate), new Date(second.airDate)]

        if (firstDate > secondDate) return 1
        if (firstDate < secondDate) return -1

        return 0
      })
    }

    setPast(scheduleList.filter((item) => {
      if (new Date(item.airDate) <= new Date()) return item
      return false
    }))
    setFuture(scheduleList.filter((item) => {
      if (new Date(item.airDate) > new Date()) return item
      return false
    }))
  }, [schedule])

  useEffect(() => {
    if (past.length && future.length) {
      myRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [past, future])

  const handleToggleSubscribes = () => {

  }

  const displayMovieList = () => {
    if (searchStatus && !searchQuery.length) {
      return (
        <div className="CalendarPage-subscribes-loading">
          {searchStatus}
        </div>
      )
    }

    return (
      <div className="CalendarPage-subscribes-list">
        { (!searchList.length) ? (
          movieList.map(({
            id, title, poster,
          }) => (
            <MovieCard
              key={id}
              name={title}
              background={poster}
              checked
              changeable="subscribes"
              onClick={handleToggleSubscribes}
            />
          ))
        ) : (
          searchList.map(({
            id, title, poster, checked,
          }) => (
            <MovieCard
              key={id}
              name={title}
              background={poster}
              checked={checked}
              changeable
            />
          ))
        )}
      </div>
    )
  }

  return (
    <div className="CalendarPage">
      <div className="CalendarPage-calendar">
        <Calendar data={schedule} />

        <div className="CalendarPage-scheduleList">
          <MovieList movieList={past.map((item) => ({
            id: item.id,
            title: item.info.title,
            poster: item.info.poster,
            episode: item.shortName,
            date: item.airDate,
          }))}
          />

          {(!!past.length && !!future.length) && (
            <div className="CalendarPage-scheduleList-separator">
              <span>today</span>
              <div ref={myRef} className="CalendarPage-scheduleList-separator-scroll" />
            </div>
          )}

          <MovieList movieList={future.map((item) => ({
            id: item.id,
            title: item.info.title,
            poster: item.info.poster,
            episode: item.shortName,
            date: item.airDate,
          }))}
          />
        </div>
      </div>

      <div className="CalendarPage-subscribes">
        <Input
          type="search"
          onChangeValue={(e) => {
            searchQuery = e.target.value
            if (!searchQuery.length) dispatch(getSearch(searchQuery))
          }}
          onSubmitValue={() => {
            dispatch(getSearch(searchQuery))
          }}
        />

        {displayMovieList()}
      </div>
    </div>
  )
}

export default CalendarPage
