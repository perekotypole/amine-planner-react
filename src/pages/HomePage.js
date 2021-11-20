import '../assets/styles/pages/HomePage.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribes, getPlannerList } from '../store/movieSlice'

import Calendar from '../components/calendar/Calendar'
import ProfileHead from '../components/profile/ProfileHead'
import MovieCard from '../components/movies/MovieCard'
import MovieList from '../components/movies/MovieList'

const HomePage = () => {
  const dispatch = useDispatch()

  const movieList = useSelector((state) => state.movies.subscribes)
  const schedule = useSelector((state) => state.movies.schedule)
  const planner = useSelector((state) => state.movies.planner)

  useEffect(() => {
    dispatch(getSubscribes())
    dispatch(getPlannerList('plans'))
  }, [])

  return (
    <div className="HomePage">
      <div className="HomePage-profile">
        <ProfileHead />

        <div className="HomePage-profile-movieList">
          {movieList.map(
            ({ title, id, poster }) => (
              <MovieCard
                key={id}
                name={title}
                background={poster}
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
}

export default HomePage
