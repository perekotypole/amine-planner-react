import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './assets/styles/App.scss'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

const App = () => {
  const isLoggedIn = useSelector((state) => state.authorization.isLoggedIn)
  const loadingUser = useSelector((state) => state.authorization.loadingUser)

  if (loadingUser) {
    return <div>Loading....</div>
  }

  return (
    <Router>
      <Switch>
        <Route
          path="/login"
          render={({ location }) => (!isLoggedIn ? (
            <LoginPage />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          ))}
        />
        <Route
          path="/"
          render={({ location }) => (isLoggedIn ? (
            <HomePage />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          ))}
        />
      </Switch>
    </Router>
  )
}

export default App
