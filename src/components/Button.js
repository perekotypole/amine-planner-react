import PropTypes from 'prop-types'
import '../assets/styles/App.scss'

const Button = ({
  name, type,
}) => (
  <div className="Button">
    <button type={type}>{name}</button>
  </div>
)

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
}

Button.defaultProps = {
  type: 'button',
}

export default Button
