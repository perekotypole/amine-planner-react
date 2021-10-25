import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import './assets/styles/App.scss'

import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import ListPage from './pages/ListPage'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/404Page'

import ProfileHead from './components/profile/ProfileHead'
import MenuItem from './components/menu/MenuItem'

import homeIcon from './assets/images/icons/home.svg'
import calendarIcon from './assets/images/icons/calendar.svg'
import listIcon from './assets/images/icons/list.svg'

const App = () => {
  const [token, setToken] = useState()

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {token
            ? <LoginPage setToken={setToken} />
            : (
              <Router>
                <div className="App">
                  <div className="App-menu">
                    <ProfileHead small />

                    <div className="App-menu-list">
                      {[
                        { icon: homeIcon, name: 'Особистий профіль', link: '/' },
                        { icon: calendarIcon, name: 'Календар виходу серій', link: '/calendar' },
                        { icon: listIcon, name: 'Список перегляду', link: '/listBoard' },
                      ].map(({ icon, name, link }) => (
                        <MenuItem
                          exact
                          key={name}
                          icon={icon}
                          name={name}
                          link={link}
                        />
                      ))}
                    </div>

                    <div className="App-menu-footer">
                      Вихід
                    </div>
                  </div>

                  <div className="App-content">
                    <Switch>
                      <Route exact path="/">
                        <HomePage />
                      </Route>
                      <Route path="/calendar">
                        <CalendarPage />
                      </Route>
                      <Route path="/listBoard">
                        <ListPage />
                      </Route>
                    </Switch>
                  </div>
                </div>
              </Router>
            )}
        </Route>

        <Route path="/404">
          <NotFound />
        </Route>

        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
