import React, { useRef, useEffect } from 'react'
import '../assets/styles/pages/CalendarPage.scss'
import Calendar from '../components/calendar/Calend'
import MovieCard from '../components/movies/MovieCard'
import MovieList from '../components/movies/MovieList'
import Input from '../components/Input'

import schedule from '../assets/data/schedule'
import movieList from '../assets/data/moviesList'

const today = new Date()
today.setHours(0, 0, 0, 0)

const past = schedule.filter((item) => {
  if (item.date <= today) return item
  return false
})
const future = schedule.filter((item) => {
  if (item.date > today) return item
  return false
})

const CalendarPage = () => {
  const myRef = useRef(null)
  useEffect(() => myRef.current.scrollIntoView(), [])

  return (
    <div className="CalendarPage">
      <div className="CalendarPage-calendar">
        <Calendar data={schedule} />

        <div className="CalendarPage-scheduleList">
          <MovieList movieList={past} />

          <div className="CalendarPage-scheduleList-separator">
            <span>today</span>
            <div ref={myRef} className="CalendarPage-scheduleList-separator-scroll" />
          </div>

          <MovieList movieList={future} />
        </div>
      </div>

      <div className="CalendarPage-subscribes">
        <Input type="search" />

        <div className="CalendarPage-subscribes-list">
          {movieList.map(
            ({ name, background, checked }) => (
              <MovieCard
                key={name}
                name={name}
                background={background}
                checked={checked}
                changeable
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
