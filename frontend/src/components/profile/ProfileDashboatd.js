import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribes, getPlannerList } from '../../store/movieSlice'
import '../../assets/styles/components/Profile.scss'

import Calendar from '../calendar/Calendar'
import ProfileHead from './ProfileHead'
import MovieCard from '../movies/MovieCard'
import MovieList from '../movies/MovieList'

const ProfileDashboatd = () => {
  const dispatch = useDispatch()

  const movieList = useSelector((state) => state.movies.subscribes)
  const schedule = useSelector((state) => state.movies.schedule)
  const planner = useSelector((state) => state.movies.planner)

  useEffect(() => {
    dispatch(getSubscribes())
    dispatch(getPlannerList('plan'))
  }, [])

  return (
    <div className="ProfileDashboatd">
      <div className="ProfileDashboatd-profile">
        <ProfileHead />

        <div className="ProfileDashboatd-profile-movieList">
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

      <div className="ProfileDashboatd-content">
        <Calendar data={schedule} />

        <MovieList name="В планах" movieList={planner.plan} />
      </div>
    </div>
  )
}

export default ProfileDashboatd
