import { NavLink } from 'react-router-dom'
import '../../assets/styles/components/Login.scss'

import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'

import GoogleIcon from '../../assets/images/icons/google.svg'

const Registration = () => (
  <div className="Registration">
    <div className="Registration-header">
      <h1>
        Доброго дня,
        <br />
        давайте знайомитись
      </h1>

      <NavLink to="/">
        <span>Вхід</span>
      </NavLink>
    </div>

    <form>
      <Input placeholder="username" />
      <Input placeholder="e-mail" />
      <Input placeholder="password" />
      <Input placeholder="repeat password" />
    </form>

    <div className="Registration-submit">
      <Checkbox name="не виходити" />
      <Button name="Увійти" type="submit" />
    </div>

    <div className="Registration-google">
      <span>або можеш зайти через</span>
      <img src={GoogleIcon} alt="google" />
    </div>
  </div>
)

export default Registration
