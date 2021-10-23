import PropTypes from 'prop-types'
import '../../assets/styles/components/Movies.scss'
import checkIcon from '../../assets/images/icons/check.svg'

const MovieCard = ({
  name, background, checked,
}) => (
  <div className="MovieCard">
    <div className="MovieCard-content">
      <div className="MovieCard-background">
        <img src={background} alt={name} />
      </div>

      <div className="MovieCard-shadow">
        <div className="MovieCard-name">
          {name}
        </div>

        <div className="MovieCard-check">
          <img
            className={checked ? 'checked' : 'unchecked'}
            src={checkIcon}
            alt={checked ? 'checked' : 'unchecked'}
          />
        </div>
      </div>
    </div>
  </div>
)

MovieCard.defaultProps = {
  checked: false,
}

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

export default MovieCard
