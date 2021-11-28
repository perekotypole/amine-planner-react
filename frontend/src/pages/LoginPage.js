import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import '../assets/styles/pages/LoginPage.scss'
import Login from '../components/login/Login'
import Registration from '../components/login/Registration'

import Rai from '../assets/images/rei.png'

const LoginPage = () => (
  <div className="LoginPage">
    <Router>
      <div className="LoginPage-contentForm">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
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

export default LoginPage
