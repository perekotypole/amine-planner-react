/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types'
import '../assets/styles/App.scss'

import SearchIcon from '../assets/images/icons/search.svg'

const Input = ({
  placeholder,
  type,
  onChangeValue,
  onSubmitValue,
  error,
}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') onSubmitValue()
  }

  return (
    <div>
      <div className="Input">
        <input
          type={!type ? 'text' : type}
          placeholder={placeholder}
          onChange={onChangeValue}
          onKeyPress={handleKeyPress}
        />

        {type && (
          <div className="Input-icon" onClick={onSubmitValue}>
            {type === 'search' && <img src={SearchIcon} alt="search" />}
          </div>
        )}

        <div className="Input-focus" />
      </div>

      {error ? (<div className="Input-error">{error}</div>) : ''}
    </div>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChangeValue: PropTypes.func,
  onSubmitValue: PropTypes.func,
  error: PropTypes.string,
}

Input.defaultProps = {
  placeholder: '',
  type: null,
  onChangeValue: () => {},
  onSubmitValue: () => {},
  error: '',
}

export default Input
