import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import PropTypes from 'prop-types'

import '../assets/styles/pages/LoginPage.scss'
import Login from '../components/login/Login'
import Registration from '../components/login/Registration'

import Rai from '../assets/images/rei.png'

const LoginPage = ({ setToken }) => (
  <div className="LoginPage">
    <Router>
      <div className="LoginPage-contentForm">
        <Switch>
          <Route exact path="/">
            <Login getToken={(value) => setToken(value)} />
          </Route>
          <Route path="/registration">
            <Registration getToken={(value) => setToken(value)} />
          </Route>

          <Route><Redirect to="/" /></Route>
        </Switch>
      </div>
    </Router>

    <div className="LoginPage-image">
      <img src={Rai} alt="rei ayanami" />
    </div>
  </div>
)

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default LoginPage
