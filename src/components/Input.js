import PropTypes from 'prop-types'
import '../assets/styles/App.scss'

import SearchIcon from '../assets/images/icons/search.svg'

const Input = ({
  placeholder,
  type,
}) => (
  <div className="Input">
    <input type="text" placeholder={placeholder} />
    {type && (
      <div className="Input-icon">
        {type === 'search' && <img src={SearchIcon} alt="search" />}
      </div>
    )}

    <div className="Input-focus" />
  </div>
)

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

Input.defaultProps = {
  placeholder: '',
  type: null,
}

export default Input
