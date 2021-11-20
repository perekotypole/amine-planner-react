import PropTypes from 'prop-types'
import MovieItem from './MovieItem'
import '../../assets/styles/components/Movies.scss'

const MovieList = ({
  name, movieList, empty,
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
                key={item.id}
                name={item.title}
                background={item.poster}
                date={item.date}
                episode={item.episode}
              />
            ),
          )}
        </div>
      )
      : empty && (
        <div className="MovieList-empty">
          <span>Список поки що пустує</span>
        </div>
      )}
  </div>
)

MovieList.defaultProps = {
  movieList: [],
  empty: false,
}

MovieList.propTypes = {
  name: PropTypes.string.isRequired,
  movieList: PropTypes.arrayOf(PropTypes.object),
  empty: PropTypes.bool,
}

export default MovieList
