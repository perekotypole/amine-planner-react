import { useState } from 'react'
import PropTypes from 'prop-types'
import '../assets/styles/App.scss'

const Checkbox = ({
  name, checked, onChange,
}) => {
  const [localChecked, setChecked] = useState(checked)
  const handleClick = () => setChecked(!checked)

  return (
    <label className="Checkbox">
      {name}
      <input
        type="checkbox"
        defaultChecked={checked}
        onClick={handleClick}
        onChange={onChange(localChecked)}
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
