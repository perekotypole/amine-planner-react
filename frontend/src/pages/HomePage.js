import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogout } from '../store/authorizationSlice'
import '../assets/styles/pages/HomePage.scss'

import ProfileHead from '../components/profile/ProfileHead'
import MenuItem from '../components/menu/MenuItem'

import homeIcon from '../assets/images/icons/home.svg'
import calendarIcon from '../assets/images/icons/calendar.svg'
import listIcon from '../assets/images/icons/list.svg'

import CalendarPage from './CalendarPage'
import ListPage from './ListPage'
import ProfileDashboatd from '../components/profile/ProfileDashboatd'

const HomePage = () => {
  const dispatch = useDispatch()

  return (
    <Router>
      <div className="HomePage">
        <div className="HomePage-menu">
          <ProfileHead small />

          <div className="HomePage-menu-list">
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

          <div className="HomePage-menu-footer">
            <button
              type="button"
              onClick={() => { dispatch(setLogout()) }}
            >
              Вихід
            </button>
          </div>
        </div>

        <div className="HomePage-content">
          <Switch>
            <Route exact path="/">
              <ProfileDashboatd />
            </Route>
            <Route path="/calendar">
              <CalendarPage />
            </Route>
            <Route path="/listBoard">
              <ListPage />
            </Route>

            <Route><Redirect to="/" /></Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default HomePage
