import { useEffect } from 'react'
import '../../assets/styles/components/Movies.scss'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { updatePlannerData, getPlannerList } from '../../store/movieSlice'

import MovieListDND from './MovieListDND'

const ListPage = () => {
  const list = useSelector((state) => state.movies.planner)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlannerList('plans'))
    dispatch(getPlannerList('watching'))
    dispatch(getPlannerList('awaiting'))
    dispatch(getPlannerList('finished'))
    dispatch(getPlannerList('paused'))
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
          <MovieListDND name="В планах" prefix="plans" movieList={list.plans} />
        </div>

        <div className="MoviesBoard-column">
          <MovieListDND name="Дивлюсь" prefix="watching" movieList={list.watching} />
          <MovieListDND name="В очікуванні" prefix="awaiting" movieList={list.awaiting} />
        </div>

        <div className="MoviesBoard-column">
          <MovieListDND name="Закінчено" prefix="finished" movieList={list.finished} />
          <MovieListDND name="Кинуто" prefix="paused" movieList={list.paused} />
        </div>
      </DragDropContext>
    </div>
  )
}

export default ListPage
