import { useState } from 'react'
import PropTypes from 'prop-types'
import '../assets/styles/App.scss'

const Checkbox = ({
  name,
}) => {
  const [checked, setChecked] = useState(false)
  const handleClick = () => setChecked(!checked)

  return (
    <label className="Checkbox">
      {name}
      <input type="checkbox" checked={checked} onChange={handleClick} />
      <span className="checkmark" />
    </label>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Checkbox
