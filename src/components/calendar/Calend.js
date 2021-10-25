import React, { Component } from 'react'
import * as dateFns from 'date-fns'
import locale from 'date-fns/locale/uk'
import PropTypes from 'prop-types'

import '../../assets/styles/components/Calendar.scss'

import DayItem from './DayItem'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      schedule: props.data,
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

          this.state.schedule.forEach((item) => {
            if (item.date === date) {
              name = item.name
              image = item.background
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

Calendar.defaultProps = {
  data: [],
}

Calendar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default Calendar
