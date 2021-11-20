import React, { useEffect, useState } from 'react'
import * as dateFns from 'date-fns'
import locale from 'date-fns/locale/uk'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { getSchedule } from '../../store/movieSlice'

import '../../assets/styles/components/Calendar.scss'

import DayItem from './DayItem'

const Calendar = ({ data }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSchedule())
  }, [])

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const schedule = data

  const nextMonth = () => {
    const month = dateFns.addMonths(currentMonth, 1)
    dispatch(getSchedule(month))
    setCurrentMonth(month)
  }

  const prevMonth = () => {
    const month = dateFns.subMonths(currentMonth, 1)
    dispatch(getSchedule(month))
    setCurrentMonth(month)
  }

  const renderHeader = () => {
    const dateFormat = 'LLLL yyyy'

    let month = dateFns.format(currentMonth, dateFormat, { locale })
    month = month.charAt(0).toUpperCase() + month.slice(1)

    return (
      <div className="Calendar-header">
        <button type="button" className="icon" onClick={prevMonth}>
          &#60;
        </button>

        <div className="Calendar-header-month">
          {month}
        </div>

        <button type="button" className="icon" onClick={nextMonth}>
          &#62;
        </button>
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart, { locale })
    const endDate = dateFns.endOfWeek(monthEnd, { locale })

    const dateFormat = 'd'
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ''

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        if (!dateFns.isSameMonth(day, monthStart)) {
          days.push(
            <div className="Calendar-col" key={day} />,
          )
        } else {
          const date = new Date(
            `${dateFns.format(currentMonth, 'yyyy-MM')}-${dateFns.format(day, 'dd')}`,
          ).setHours(0, 0, 0, 0)

          let name = ''
          let image = ''

          schedule.forEach((item) => {
            const episodeDate = new Date(item.airDate).setHours(0, 0, 0, 0)
            if (episodeDate === date) {
              name = item.info.title
              image = item.info.poster
            }
          })

          formattedDate = dateFns.format(day, dateFormat)

          days.push(
            <div
              className={`Calendar-col ${Date.parse(day) === Date.parse(today)
                && 'Calendar-col-today'}`}
              key={day}
            >
              <DayItem
                number={formattedDate}
                name={name}
                background={image}
              />
            </div>,
          )
        }

        day = dateFns.addDays(day, 1)
      }
      rows.push(
        <div className="Calendar-row" key={day}>
          {days}
        </div>,
      )
      days = []
    }
    return <div className="Calendar-body">{rows}</div>
  }

  return (
    <div className="Calendar">
      {renderHeader()}
      {renderCells()}
    </div>
  )
}

Calendar.defaultProps = {
  data: [],
}

Calendar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default Calendar
