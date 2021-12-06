import { useEffect } from 'react'
import '../../assets/styles/components/Movies.scss'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { updatePlannerData, getPlannerList } from '../../store/movieSlice'

import MovieListDND from './MovieListDND'

const ListPage = () => {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.movies.planner)

  useEffect(() => {
    dispatch(getPlannerList('plan'))
    dispatch(getPlannerList('watching'))
    dispatch(getPlannerList('onHold'))
    dispatch(getPlannerList('completed'))
    dispatch(getPlannerList('dropped'))
  }, [])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    dispatch(updatePlannerData({
      sourceList: result.source.droppableId,
      destinationList: result.destination.droppableId,
      removedElementIndex: result.source.index,
      addedElementIndex: result.destination.index,
    }))
  }

  return (
    <div className="MoviesBoard">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="MoviesBoard-column">
          <MovieListDND name="В планах" prefix="plan" movieList={list.plan} />
        </div>

        <div className="MoviesBoard-column">
          <MovieListDND name="Дивлюсь" prefix="watching" movieList={list.watching} />
          <MovieListDND name="В очікуванні" prefix="onHold" movieList={list.onHold} />
        </div>

        <div className="MoviesBoard-column">
          <MovieListDND name="Закінчено" prefix="completed" movieList={list.completed} />
          <MovieListDND name="Кинуто" prefix="dropped" movieList={list.dropped} />
        </div>
      </DragDropContext>
    </div>
  )
}

export default ListPage
