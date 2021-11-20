import PropTypes from 'prop-types'
import '../../assets/styles/components/Menu.scss'

import {
  NavLink,
} from 'react-router-dom'

const MenuItem = ({
  exact,
  icon,
  name,
  link,
}) => (
  <NavLink to={link} className="MenuItem" exact={exact}>
    <div className="MenuItem-icon">
      <img src={icon} alt={name} />
    </div>
    <div className="MenuItem-name">{name}</div>
  </NavLink>
)

MenuItem.propTypes = {
  exact: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

MenuItem.defaultProps = {
  exact: false,
}

export default MenuItem
