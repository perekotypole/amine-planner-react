import '../assets/styles/pages/HomePage.scss'
import Calendar from '../components/calendar/Calend'
import ProfileHead from '../components/profile/ProfileHead'
import MovieCard from '../components/movies/MovieCard'
import MovieList from '../components/movies/MovieList'

import Jojo from '../assets/images/jojo.jpg'

const movieList = [
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
  {
    name: 'Убивая слизней 300 лет, сама того не заметив, я достигла максимального уровня',
    background: Jojo,
  },
  {
    name: 'Неймовірні пригоди ДжоДжо',
    background: Jojo,
  },
]

const HomePage = () => (
  <div className="HomePage">
    <div className="HomePage-profile">
      <ProfileHead />

      <div className="HomePage-profile-movieList">
        {movieList.map(
          ({ name, background }) => (
            <MovieCard
              key={name}
              name={name}
              background={background}
              checked
            />
          ),
        )}
      </div>
    </div>

    <div className="HomePage-dashboard">
      <Calendar />

      <MovieList name="В планах" movieList={movieList} />
    </div>
  </div>
)

export default HomePage
