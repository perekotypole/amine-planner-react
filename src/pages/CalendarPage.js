import React, { useRef, useEffect } from 'react'
import '../assets/styles/pages/CalendarPage.scss'
import Calendar from '../components/calendar/Calend'
import MovieCard from '../components/movies/MovieCard'
import MovieList from '../components/movies/MovieList'
import Input from '../components/Input'

import Jojo from '../assets/images/jojo.jpg'

const movieList = [
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
    checked: true,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
]

const schedule = [
  {
    date: Date.parse('2021-10-01'),
    name: 'Jojo',
    episode: '2 сезон, 12 серія',
    background: Jojo,
  },
  {
    date: Date.parse('2021-10-10'),
    name: 'Jojo',
    episode: '2 сезон, 12 серія',
    background: Jojo,
  },
  {
    date: Date.parse('2021-10-21'),
    name: 'Jojo',
    episode: '2 сезон, 12 серія',
    background: Jojo,
  },
  {
    date: Date.parse('2021-10-22'),
    name: 'Jojo',
    episode: '2 сезон, 12 серія',
    background: Jojo,
  },
]

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
        <Calendar />

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
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
