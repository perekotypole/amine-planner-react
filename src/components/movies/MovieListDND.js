import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import MovieItem from './MovieItem'
import '../../assets/styles/components/Movies.scss'

const MovieListDND = ({
  name, movieList, prefix,
}) => (
  <Droppable droppableId={prefix}>
    {(provided) => (
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
            <div className="MovieList-items" {...provided.droppableProps} ref={provided.innerRef}>
              {movieList.map(
                (item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(innerProvided, snapshot) => (
                      <div
                        ref={innerProvided.innerRef}
                        snapshot={snapshot}
                        {...innerProvided.draggableProps}
                        {...innerProvided.dragHandleProps}
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
              {provided.placeholder}
            </div>
          )
          : (
            <div className="MovieList-empty" ref={provided.innerRef}>
              <span>Список поки що пустує</span>
              {provided.placeholder}
            </div>
          )}
      </div>
    )}
  </Droppable>
)

MovieListDND.defaultProps = {
  movieList: [],
  name: null,
}

MovieListDND.propTypes = {
  name: PropTypes.string,
  movieList: PropTypes.arrayOf(PropTypes.object),
  prefix: PropTypes.string.isRequired,
}

export default MovieListDND
