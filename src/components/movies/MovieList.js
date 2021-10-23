import PropTypes from 'prop-types'
import MovieItem from './MovieItem'
import '../../assets/styles/components/Movies.scss'

const MovieList = ({
  name, movieList,
}) => (
  <div className="MovieList">
    {name && (
      <div className="MovieList-name">
        {name}
        {' '}
        <span className="quality">
          (
          {movieList.length}
          )
        </span>
      </div>
    )}

    {movieList.length
      ? (
        <div className="MovieList-items">
          {movieList.map(
            (item) => (
              <MovieItem
                key={item.name}
                name={item.name}
                background={item.background}
                date={item.date}
                episode={item.episode}
              />
            ),
          )}
        </div>
      )
      : (
        <div className="MovieList-empty">
          <span>Список поки що пустує</span>
        </div>
      )}
  </div>
)

MovieList.defaultProps = {
  movieList: [],
}

MovieList.propTypes = {
  name: PropTypes.string.isRequired,
  movieList: PropTypes.arrayOf,
}

export default MovieList
