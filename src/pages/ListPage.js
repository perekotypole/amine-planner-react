import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribes, getSearch } from '../store/movieSlice'
import '../assets/styles/pages/ListPage.scss'

import MoviesBoard from '../components/movies/MoviesBoard'
import MovieCard from '../components/movies/MovieCard'
import Button from '../components/Button'
import Input from '../components/Input'

import iconAdd from '../assets/images/icons/add.svg'
import iconDelete from '../assets/images/icons/delete.svg'

const ListPage = () => {
  const dispatch = useDispatch()
  let searchQuery = ''
  const plannerTypes = [
    {
      label: 'В планах',
      name: 'plans',
      checked: true,
    },
    {
      label: 'Дивлюсь',
      name: 'watching',
    },
    {
      label: 'Закінчено',
      name: 'finished',
    },
    {
      label: 'В очікуванні',
      name: 'awaiting',
    },
    {
      label: 'Кинуто',
      name: 'paused',
    },
  ]

  const movieList = useSelector((state) => state.movies.subscribes)
  const searchList = useSelector((state) => state.movies.search)
  const searchStatus = useSelector((state) => state.movies.searchStatus)

  const [typeList, setTypeList] = useState('plans')
  const [searchWindow, setSearchWindow] = useState('hidden')

  useEffect(() => {
    dispatch(getSubscribes())
  }, [])

  const displayMovieList = () => {
    if (searchStatus && !searchQuery.length) {
      return (
        <div className="CalendarPage-subscribes-loading">
          {searchStatus}
        </div>
      )
    }

    return (
      <div className="ListPage-search-list">
        { (!searchList.length) ? (
          movieList.map(({
            id, title, poster,
          }) => (
            <MovieCard
              key={id}
              name={title}
              background={poster}
              checked
              changeable
            />
          ))
        ) : (
          searchList.map(({
            id, title, poster, checked,
          }) => (
            <MovieCard
              key={id}
              name={title}
              background={poster}
              checked={checked}
              changeable
            />
          ))
        )}
      </div>
    )
  }

  return (
    <div className="ListPage">
      <div className="ListPage-bar">
        <h2 className="blackFont">Посортуй свій список перегляду</h2>

        <Button
          onClick={() => setSearchWindow('shown')}
          name="Добавити до списку"
          buttonStyle="dark"
          icon={iconAdd}
        />
      </div>

      <MoviesBoard />

      <div
        className="ListPage-search"
        data-hidden={searchWindow}
      >
        <div className="ListPage-search-bar">
          <Input
            type="search"
            onChangeValue={(e) => {
              searchQuery = e.target.value
              if (!searchQuery.length) dispatch(getSearch(searchQuery))
            }}
            onSubmitValue={() => {
              dispatch(getSearch(searchQuery))
            }}
          />

          <button type="button" onClick={() => setSearchWindow('hidden')}>
            <img src={iconDelete} alt="close" />
          </button>
        </div>

        <div className="ListPage-search-content">
          {displayMovieList()}

          <div className="ListPage-search-types">
            {plannerTypes.map(({ label, name }) => (
              <label className="container" key={name}>
                <input
                  type="radio"
                  name="plannerTypes"
                  value={name}
                  checked={typeList === name}
                  onChange={(e) => setTypeList(e.target.value)}
                />
                <span className="checkmark" />
                <span className="label">{label}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ListPage
