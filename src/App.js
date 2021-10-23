import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import './assets/styles/App.scss'

import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import ListPage from './pages/ListPage'

import ProfileHead from './components/profile/ProfileHead'
import MenuItem from './components/menu/MenuItem'

import homeIcon from './assets/images/icons/home.svg'
import calendarIcon from './assets/images/icons/calendar.svg'
import listIcon from './assets/images/icons/list.svg'

const App = () => (
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
)

export default App
