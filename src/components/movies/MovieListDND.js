/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import MovieItem from './MovieItem'
import '../../assets/styles/components/Movies.scss'

const MovieListDND = ({
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
        <Droppable droppableId="list">
          {(provided) => (
            <div className="MovieList-items" {...provided.droppableProps} ref={provided.innerRef}>
              {movieList.map(
                (item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided1) => (
                      <div
                        ref={provided1.innerRef}
                        {...provided1.draggableProps}
                        {...provided1.dragHandleProps}
                      >
                        <MovieItem
                          name={item.name}
                          background={item.background}
                          date={item.date}
                          episode={item.episode}
                        />
                      </div>
                    )}
                  </Draggable>
                ),
              )}
            </div>
          )}
        </Droppable>
      )
      : (
        <div className="MovieList-empty">
          <span>Список поки що пустує</span>
        </div>
      )}
  </div>
)

MovieListDND.defaultProps = {
  movieList: [],
  name: null,
}

MovieListDND.propTypes = {
  name: PropTypes.string,
  movieList: PropTypes.arrayOf(PropTypes.object),
}

export default MovieListDND
