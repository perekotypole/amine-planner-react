/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import '../../assets/styles/components/Movies.scss'

const MovieItem = ({
  name, background, date, episode, icon, onClick,
}) => {
  let formatedDate = null
  if (date) formatedDate = format(new Date(date), 'dd/MM/yyyy')

  return (
    <div className="MovieItem">
      { background && (
        <div className="MovieItem-image">
          <img src={background} alt={name} />
        </div>
      )}

      <div className="MovieItem-description">
        <div className="MovieItem-name">
          {name}
          <span className="MovieItem-episode">{episode}</span>
        </div>
        {formatedDate && <div className="MovieItem-date">{formatedDate}</div>}
      </div>

      { icon && (
        <div className="MovieItem-icon" onClick={onClick}>
          <img src={icon} alt="icon" />
        </div>
      )}
    </div>
  )
}

MovieItem.defaultProps = {
  background: '',
  date: '',
  episode: '',
  icon: '',
  onClick: () => {},
}

MovieItem.propTypes = {
  name: PropTypes.string.isRequired,
  background: PropTypes.string,
  date: PropTypes.string,
  episode: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
}

export default MovieItem
