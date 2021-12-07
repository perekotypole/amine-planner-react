import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { removePlannerItem } from '../../store/movieSlice'

import MovieItem from './MovieItem'
import '../../assets/styles/components/Movies.scss'
import deleteIcon from '../../assets/images/icons/trash.svg'

const MovieListDND = ({
  name, movieList, prefix,
}) => {
  const dispatch = useDispatch()
  const deleteItem = (id) => {
    dispatch(removePlannerItem({ listName: prefix, movieID: id }))
  }

  return (
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
                            name={item.title}
                            background={item.poster}
                            icon={deleteIcon}
                            onClick={() => { deleteItem(item.id) }}
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
}

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
