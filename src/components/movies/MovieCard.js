import PropTypes from 'prop-types'
import '../../assets/styles/components/Movies.scss'

import checkIcon from '../../assets/images/icons/check.svg'
import addIcon from '../../assets/images/icons/add.svg'
import deleteIcon from '../../assets/images/icons/delete.svg'

const MovieCard = ({
  name, background, checked, changeable,
}) => (
  <div className={`MovieCard ${changeable && 'MovieCard-changeable'}`}>
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

      <div className="MovieCard-foreground">
        { checked
          ? (
            <div>
              <div className="MovieCard-foreground-icon MovieCard-foreground-icon-cross">
                <img src={deleteIcon} alt="unsubscribe" />
              </div>

              <span>Відписатись</span>
            </div>
          )
          : (
            <div>
              <div className="MovieCard-foreground-icon MovieCard-foreground-icon-plus">
                <img src={addIcon} alt="subscribe" />
              </div>
              <span>Додати</span>
            </div>
          )}
      </div>
    </div>
  </div>
)

MovieCard.defaultProps = {
  checked: false,
  changeable: false,
}

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  changeable: PropTypes.bool,
}

export default MovieCard
