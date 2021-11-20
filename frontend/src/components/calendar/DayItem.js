import PropTypes from 'prop-types'
import '../../assets/styles/components/Calendar.scss'

const DayItem = ({
  number, name, background,
}) => (
  <div className="DayItem" title={name}>
    { background
      ? (
        <div className="DayItem-background">
          <img src={background} alt={name} />
        </div>
      )
      : null }

    <div className="DayItem-number">{number}</div>
  </div>
)

DayItem.defaultProps = {
  name: '',
  background: '',
}

DayItem.propTypes = {
  number: PropTypes.string.isRequired,
  name: PropTypes.string,
  background: PropTypes.string,
}

export default DayItem
