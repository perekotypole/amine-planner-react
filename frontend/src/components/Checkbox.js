import { useRef } from 'react'
import PropTypes from 'prop-types'
import '../assets/styles/App.scss'

const Checkbox = ({
  name, checked, onChange,
}) => {
  const checkboxRef = useRef()

  const handleClick = () => {
    onChange(checkboxRef.current.checked)
  }

  return (
    <label className="Checkbox">
      {name}
      <input
        type="checkbox"
        defaultChecked={checked}
        ref={checkboxRef}
        onClick={handleClick}
      />
      <span className="checkmark" />
    </label>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  onChange: () => {},
}

export default Checkbox
