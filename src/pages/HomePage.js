import '../assets/styles/pages/HomePage.scss'
import Calendar from '../components/calendar/Calend'
import ProfileHead from '../components/profile/ProfileHead'
import MovieCard from '../components/movies/MovieCard'
import MovieList from '../components/movies/MovieList'

import schedule from '../assets/data/schedule'
import movieList from '../assets/data/moviesList'
import planner from '../assets/data/plannerList'

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
      <Calendar data={schedule} />

      <MovieList name="В планах" movieList={planner.plans} />
    </div>
  </div>
)

export default HomePage
