import PropTypes from 'prop-types'
import '../assets/styles/App.scss'

const Button = ({
  name, type, buttonStyle, icon, onClick,
}) => (
  <div className={`Button ${!!type && (`Button-${buttonStyle}`)}`}>
    <button type={type} onClick={onClick}>
      {name}
      {!!icon && <img src={icon} alt="icon" />}
    </button>
  </div>
)

Button.propTypes = {
  name: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  onClick: PropTypes.func,
}

Button.defaultProps = {
  type: 'button',
  buttonStyle: '',
  icon: '',
  onClick: () => {},
}

export default Button
