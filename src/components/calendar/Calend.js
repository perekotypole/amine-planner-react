import React from 'react'
import * as dateFns from 'date-fns'
import locale from 'date-fns/locale/uk'
import '../../assets/styles/components/Calendar.scss'

import DayItem from './DayItem'
import Jojo from '../../assets/images/jojo.jpg'

const schedule = [
  {
    date: Date.parse('2021-10-01'),
    name: 'Jojo',
    image: Jojo,
  },
  {
    date: Date.parse('2021-10-10'),
    name: 'Jojo',
    image: Jojo,
  },
  {
    date: Date.parse('2021-10-21'),
    name: 'Jojo',
    image: Jojo,
  },
]

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
    }

    this.nextMonth = this.nextMonth.bind(this)
    this.prevMonth = this.prevMonth.bind(this)
  }

  nextMonth() {
    this.setState((prevState) => ({
      currentMonth: dateFns.addMonths(prevState.currentMonth, 1),
    }))
  }

  prevMonth() {
    this.setState((prevState) => ({
      currentMonth: dateFns.subMonths(prevState.currentMonth, 1),
    }))
  }

  renderHeader() {
    const dateFormat = 'LLLL yyyy'

    let month = dateFns.format(this.state.currentMonth, dateFormat, { locale })
    month = month.charAt(0).toUpperCase() + month.slice(1)

    return (
      <div className="Calendar-header">
        <button type="button" className="icon" onClick={this.prevMonth}>
          &#60;
        </button>

        <div className="Calendar-header-month">
          {month}
        </div>

        <button type="button" className="icon" onClick={this.nextMonth}>
          &#62;
        </button>
      </div>
    )
  }

  renderCells() {
    const monthStart = dateFns.startOfMonth(this.state.currentMonth)
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
          const date = Date.parse(
            `${dateFns.format(this.state.currentMonth, 'yyyy-MM')}-${dateFns.format(day, 'dd')}`,
          )

          let name = ''
          let image = ''

          schedule.forEach((item) => {
            if (item.date === date) {
              name = item.name
              image = item.image
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

  render() {
    return (
      <div className="Calendar">
        {this.renderHeader()}
        {this.renderCells()}
      </div>
    )
  }
}

export default Calendar
