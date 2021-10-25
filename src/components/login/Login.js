import { NavLink } from 'react-router-dom'
import '../../assets/styles/components/Login.scss'

import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'

import GoogleIcon from '../../assets/images/icons/google.svg'

const Login = () => (
  <div className="Login">
    <div className="Login-header">
      <h1>
        Заходь,
        <br />
        ми скучили
      </h1>

      <NavLink to="/registration">
        <span>Реєстрація</span>
      </NavLink>
    </div>

    <form>
      <Input placeholder="e-mail" />
      <Input placeholder="password" />
    </form>

    <div className="Login-submit">
      <Checkbox name="не виходити" />
      <Button name="Увійти" type="submit" />
    </div>

    <div className="Login-google">
      <span>або можеш зайти через</span>
      <img src={GoogleIcon} alt="google" />
    </div>
  </div>
)
export default Login
